"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const URI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`;

      const res = await fetch(URI, {
        credentials: "include",
      });

      if (res.ok) router.push("/panel");
    })();
  }, [router]);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const msg = await res.json();
        setError(msg.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      router.push("/panel");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  return (
    <main className="bg-linear-to-br from-gray-800 to-secondary/10 text-white">
      <div className="min-h-screen justify-center container flex flex-col gap-4 items-center">
        <h2 className="mb-4 font-semibold">Login</h2>

        <form
          className="px-2 flex flex-col gap-1 w-full max-w-md"
          onSubmit={onSubmit}
        >
          <Input
            type="email"
            placeholder="Email..."
            required
            value={email}
            className="rounded-md px-5 py-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password..."
            required
            value={password}
            className="rounded-md px-5 py-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="bg-red-900 p-4 rounded-md my-1">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
}
