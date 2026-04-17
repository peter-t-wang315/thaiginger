"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

interface ParseResult {
  success: boolean;
  categoriesFound: number;
  itemsFound: number;
  preview: Array<{
    category: string;
    items: Array<{ name: string; description?: string; price?: string }>;
  }>;
}

type Status = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      // Send a HEAD-like POST with no image to test credentials
      const formData = new FormData();
      const credentials = btoa(`${username}:${password}`);
      const res = await fetch("/api/parse-menu", {
        method: "POST",
        headers: { Authorization: `Basic ${credentials}` },
        body: formData,
      });

      if (res.status === 401) {
        setLoginError("Incorrect username or password.");
        return;
      }

      // Any response other than 401 means credentials are valid
      // (400 = no image provided, which is expected here — we just wanted auth)
      setIsLoggedIn(true);
    } catch {
      setLoginError("Could not connect. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── File select ────────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setResult(null);
    setStatus("idle");
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setErrorMsg("");
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    const credentials = btoa(`${username}:${password}`);

    try {
      const res = await fetch("/api/parse-menu", {
        method: "POST",
        headers: { Authorization: `Basic ${credentials}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setIsLoggedIn(false);
          setLoginError("Incorrect username or password.");
          setStatus("idle");
          return;
        }
        throw new Error(data.error ?? "Unknown error");
      }

      setResult(data);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  // ── Login screen ───────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4 pt-20">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-3xl tracking-[.35em] text-primary mb-2">
            THAI GINGER
          </h1>
          <p className="text-center text-secondary tracking-widest text-sm mb-10 uppercase">
            Menu Admin
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#e4d4be] bg-white px-4 py-3 tracking-widest text-sm text-[#5a4030] outline-none focus:border-secondary"
              autoComplete="username"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#e4d4be] bg-white px-4 py-3 pr-12 tracking-widest text-sm text-[#5a4030] outline-none focus:border-secondary"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tracking-widest text-gray-400 hover:text-secondary uppercase"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {loginError && (
              <p className="text-xs text-[#b84c38] tracking-widest text-center">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="bg-primary text-white py-3 tracking-[.25em] text-sm font-semibold uppercase hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Checking…" : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    </>
    );
  }


  // ── Admin screen ───────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf8f5] px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl tracking-[.35em] text-primary">ADMIN</h1>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setUsername("");
              setPassword("");
            }}
            className="text-xs tracking-widest text-gray-400 hover:text-gray-600 uppercase"
          >
            Sign out
          </button>
        </div>
        <p className="text-secondary tracking-widest text-sm mb-12 uppercase">
          Upload a menu photo to update the live menu
        </p>

        {/* Upload area */}
        <div className="border-2 border-dashed border-[#e4d4be] p-8 text-center mb-6 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          {preview ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={preview}
                alt="Menu preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="py-8">
              <p className="text-[#b8956a] tracking-widest text-sm uppercase mb-2">
                Tap to choose a photo
              </p>
              <p className="text-gray-400 text-xs tracking-widest">
                JPG, PNG, WEBP supported
              </p>
            </div>
          )}
        </div>

        {file && (
          <p className="text-xs text-gray-400 tracking-widest mb-6 text-center">
            {file.name} · {(file.size / 1024).toFixed(0)} KB
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className="w-full bg-primary text-white py-4 tracking-[.25em] text-sm font-semibold uppercase hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "Parsing menu…" : "Upload & Update Menu"}
        </button>

        {/* Uploading state */}
        {status === "uploading" && (
          <div className="mt-8 text-center">
            <p className="text-secondary tracking-widest text-sm uppercase animate-pulse">
              Reading menu with AI…
            </p>
            <p className="text-gray-400 text-xs tracking-widest mt-2">
              This usually takes 10–20 seconds
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mt-8 bg-red-50 border border-red-200 px-5 py-4">
            <p className="text-[#b84c38] text-sm tracking-widest uppercase">
              Error
            </p>
            <p className="text-[#b84c38] text-xs tracking-widest mt-1">
              {errorMsg}
            </p>
          </div>
        )}

        {/* Success */}
        {status === "success" && result && (
          <div className="mt-8">
            <div className="bg-[#e8ddd0] px-5 py-4 mb-6">
              <p className="text-[#b84c38] text-sm tracking-[.2em] uppercase font-semibold">
                Menu Updated Successfully
              </p>
              <p className="text-[#5a4030] text-xs tracking-widest mt-1">
                {result.categoriesFound} categories · {result.itemsFound} items
              </p>
            </div>

            {/* Preview of what was parsed */}
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
              Parsed Preview
            </p>
            <div className="flex flex-col gap-6">
              {result.preview.map((cat) => (
                <div key={cat.category}>
                  <h3 className="text-primary tracking-[.2em] text-base mb-3">
                    {cat.category}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-start gap-4 border-b border-[#e4d4be] pb-2"
                      >
                        <div>
                          <p className="text-sm tracking-widest text-[#5a4030] uppercase">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-400 tracking-wider mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.price && (
                          <p className="text-sm text-secondary tracking-widest flex-shrink-0">
                            {item.price}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    </>

  );
}
