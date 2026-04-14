// app/menu/page.tsx
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  sort_order: number;
}

interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  menu_items: MenuItem[];
}

async function getMenu(): Promise<MenuCategory[]> {
  const { data, error } = await supabase
    .from("menu_categories")
    .select(
      "id, name, sort_order, menu_items(id, name, description, price, sort_order)",
    )
    .eq("menu_items.is_available", true)
    .order("sort_order")
    .order("sort_order", { referencedTable: "menu_items" });

  if (error || !data) return [];
  return data as MenuCategory[];
}

export const revalidate = 60; // ISR: re-fetch at most once per minute

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 w-full overflow-x-hidden">
        {/* ─── PAGE TITLE ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-20 px-4 text-center">
          <h1 className="text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px] leading-none tracking-[.35em] sm:tracking-[.45em] text-primary">
            MENU
          </h1>
          <p className="mt-8 sm:mt-10 md:mt-12 text-xl sm:text-2xl md:text-3xl tracking-[.25em] sm:tracking-[.35em] text-secondary font-thai">
            ขิงไทย — Thai Ginger
          </p>
          <div className="mt-10 sm:mt-14 w-16 h-[2px] bg-secondary opacity-60" />
        </div>

        {/* ─── MENU CONTENT ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center pb-40 px-6 sm:px-10">
          {categories.length === 0 ? (
            <p className="text-center text-gray-400 tracking-widest text-sm uppercase mt-8">
              Menu coming soon
            </p>
          ) : (
            <div className="w-full max-w-2xl flex flex-col gap-16 sm:gap-20">
              {categories.map((cat) => (
                <section key={cat.id}>
                  {/* Category heading */}
                  <h2 className="text-2xl sm:text-3xl tracking-[.3em] text-primary mb-8 sm:mb-10 text-center">
                    {cat.name.toUpperCase()}
                  </h2>

                  {/* Items */}
                  <div className="flex flex-col gap-6 sm:gap-8">
                    {cat.menu_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-6 border-b border-[#e4d4be] pb-6 sm:pb-8"
                      >
                        <div className="flex flex-col gap-1 sm:gap-2">
                          <p className="text-base sm:text-lg md:text-xl tracking-widest uppercase text-[#5a4030]">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-sm sm:text-base text-gray-400 tracking-wider leading-relaxed max-w-md">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.price && (
                          <p className="text-base sm:text-lg text-secondary tracking-widest flex-shrink-0 pt-0.5">
                            {item.price}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
