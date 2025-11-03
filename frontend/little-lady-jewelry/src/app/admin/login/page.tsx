"use client";
import { loginAdmin } from "@/app/api";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      router.push("/admin/products");
    } catch (error) {
      toast.error("Неправельний логін або пароль");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Вхід адміністратора
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="form-input mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          text="Стати адміном"
          className="block w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1.5 "
        />
      </form>
    </div>
  );
}
