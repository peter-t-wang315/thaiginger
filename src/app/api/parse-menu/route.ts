// app/api/parse-menu/route.ts
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Auth check ────────────────────────────────────────────────────────────────
function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return false;

  const base64 = authHeader.slice("Basic ".length);
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Auth
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Thai Ginger Admin"' },
      },
    );
  }

  // 2. Parse multipart form — expects a field called "image"
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const imageFile = formData.get("image") as File | null;
  if (!imageFile) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  // 3. Convert image to base64 for Claude
  const arrayBuffer = await imageFile.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const mediaType = imageFile.type as
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/webp";

  // 4. Upload image to Supabase Storage for record-keeping
  const fileName = `menu-${Date.now()}.${imageFile.name.split(".").pop()}`;
  const { data: storageData } = await supabaseAdmin.storage
    .from("menu-images")
    .upload(fileName, arrayBuffer, { contentType: imageFile.type });

  const imageUrl = storageData?.path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-images/${storageData.path}`
    : null;

  // 5. Send to Claude for parsing
  let parsedMenu: MenuCategory[];
  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: "text",
              text: `You are parsing a restaurant menu image. Extract ALL menu items and return ONLY a valid JSON array — no markdown, no explanation, just the raw JSON.

Format:
[
  {
    "category": "Category Name",
    "items": [
      {
        "name": "Dish Name",
        "description": "Description if present, otherwise omit",
        "price": "Price as shown, e.g. $12.95 or $10–$14, otherwise omit"
      }
    ]
  }
]

Rules:
- Preserve the exact category names from the menu
- Preserve exact prices as written
- If a dish has no description, omit the description field entirely
- If a dish has no price, omit the price field entirely
- Include every single item you can read`,
            },
          ],
        },
      ],
    });

    const rawText =
      response.content[0].type === "text" ? response.content[0].text : "";
    // Strip any accidental markdown fences
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    parsedMenu = JSON.parse(cleaned);
  } catch (err) {
    await supabaseAdmin.from("menu_uploads").insert({
      image_url: imageUrl,
      success: false,
      notes: `Claude parse failed: ${err}`,
    });
    return NextResponse.json(
      { error: "Failed to parse menu image" },
      { status: 500 },
    );
  }

  // 6. Clear existing menu and replace with newly parsed data
  try {
    // Delete all existing categories (cascades to items)
    await supabaseAdmin.rpc("truncate_menu");

    // Insert new categories + items
    for (let i = 0; i < parsedMenu.length; i++) {
      const cat = parsedMenu[i];

      const { data: categoryRow, error: catError } = await supabaseAdmin
        .from("menu_categories")
        .insert({ name: cat.category, sort_order: i })
        .select()
        .single();

      if (catError || !categoryRow) continue;

      const itemRows = cat.items.map((item, j) => ({
        category_id: categoryRow.id,
        name: item.name,
        description: item.description ?? null,
        price: item.price ?? null,
        sort_order: j,
      }));

      await supabaseAdmin.from("menu_items").insert(itemRows);
    }

    // Log successful upload
    await supabaseAdmin.from("menu_uploads").insert({
      image_url: imageUrl,
      success: true,
      notes: `Parsed ${parsedMenu.length} categories`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Database save failed: ${err}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    categoriesFound: parsedMenu.length,
    itemsFound: parsedMenu.reduce((sum, cat) => sum + cat.items.length, 0),
    preview: parsedMenu,
  });
}
