"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

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

  return (
    <main className="bg-gray-900 text-white">
      <div className="min-h-screen justify-center container flex flex-col gap-4 items-center">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>

        {error && <p className="text-red-400">{error}</p>}

        <form
          className="px-2 flex flex-col gap-2 w-full max-w-md"
          onSubmit={onSubmit}
        >
          <Input
            type="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
}
