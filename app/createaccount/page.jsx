"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PageHeader from "@/app/components/ui/PageHeader";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      setIsUsernameAvailable(false);
      return;
    }
    fetch("/api/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((response) => setIsUsernameAvailable(Boolean(response.success)))
      .catch(() => setIsUsernameAvailable(false));
  }, [username]);

  const onSubmit = async () => {
    const res = await fetch("/api/user/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const response = await res.json();
    if (response.success) router.push("/");
  };

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        eyebrow="Onboarding"
        title="Choose your username"
        description="This is how other members will see you across the platform."
      />
      <div className="card p-6">
        <label className="text-sm font-medium text-slate-700" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="input-pro mt-2"
          placeholder="e.g. vraj_dev"
        />
        {username && (
          <p
            className={`mt-2 text-sm font-medium ${
              isUsernameAvailable ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {isUsernameAvailable ? "Username is available" : "Username is taken"}
          </p>
        )}
        <button
          type="button"
          className="btn-primary mt-4 w-full"
          disabled={!username || !isUsernameAvailable}
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
