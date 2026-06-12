import { useState } from "react";
import { Lock, User } from "lucide-react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // tk mk tạm thời
    if (username === "admin" && password === "123456") {
      localStorage.setItem("admin_auth", "true");
      onLogin?.();
    } else {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-yellow-400/20 bg-zinc-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">Admin Login</h1>

          <p className="mt-2 text-sm text-zinc-400">
            Đăng nhập quản trị hệ thống
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Tài khoản
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4">
              <User className="h-4 w-4 text-zinc-400" />

              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent py-3 outline-none text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Mật khẩu</label>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4">
              <Lock className="h-4 w-4 text-zinc-400" />

              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-3 outline-none text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
