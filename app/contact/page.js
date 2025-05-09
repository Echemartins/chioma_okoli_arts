"use client";

import { useState } from "react";
import Header from "../header"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [subEmail, setSubEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setSuccess("Message sent!");
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subEmail }),
    });
    const data = await res.json();
    if (res.ok) setSuccess("Subscribed successfully!");
  };

  return (
    <div>
    <Header/>
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleContactSubmit} className="space-y-4 mb-12">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded">
            Send Message
          </button>
        </form>

        <div className="border-t border-gray-700 pt-10">
          <h2 className="text-2xl font-semibold mb-4">Subscribe to our Newsletter</h2>
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              required
              className="flex-1 p-3 rounded bg-gray-800 text-white"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded">
              Subscribe
            </button>
          </form>
          {success && <p className="mt-4 text-green-400">{success}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}
