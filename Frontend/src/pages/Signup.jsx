import { useState } from "react";

export default function Signup({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Account created. Please log in.");
      onAuth();
    } else {
      alert(data.detail || "Signup failed");
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Create account</h2>

      <input
        className="w-full border rounded-lg p-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border rounded-lg p-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Sign up"}
      </button>
    </div>
  );
}
