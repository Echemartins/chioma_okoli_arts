"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMsg("Account created successfully! Redirecting...");
      reset();
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setServerError(data.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-orange-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              {...register("name")}
              className="w-full px-4 py-2 border border-orange-300 rounded bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="w-full px-4 py-2 border border-orange-300 rounded bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 border border-orange-300 rounded bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-orange-300 rounded bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <AnimatePresence>
          {serverError && (
            <motion.p
              className="text-red-600 text-sm mt-4 text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {serverError}
            </motion.p>
          )}

          {successMsg && (
            <motion.p
              className="text-green-600 text-sm mt-4 text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {successMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
