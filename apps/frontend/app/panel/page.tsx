"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  role: "admin" | "owner";
}

export default function Panel() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      }
    });
  });

  if (!user) return <span>Loading...</span>;

  return (
    <main>
      <div className="container py-36 min-h-screen flex flex-col items-center justify-center gap-4">
        <h2>Hello {user.name}</h2>
      </div>
    </main>
  );
}
