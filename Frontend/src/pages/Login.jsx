import { login } from "../api";
import { useState } from "react";

export default function Login({ onSuccess, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      onSuccess(res.is_premium);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <input
        type="email"
        placeholder="Email"
        required
        className="w-full border rounded px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        className="w-full border rounded px-3 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* 🔑 THIS IS THE SIGNUP BUTTON */}
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
