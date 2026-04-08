"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

const BuildPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xreodkdv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Trigger confetti
        confetti({
          particleCount: 180,
          spread: 80,
          origin: { y: 0.6 },
        });

        setSubmitted(true);
        // Optional: Reset form after success
        setFormData({
          name: "", email: "", phone: "", projectType: "", budget: "", timeline: "", description: "",
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/#products">
          <motion.div
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Products</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 mb-6">
            🚀
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Let's Build Something Great
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto">
            Tell us about your vision. We'll turn it into a premium digital product.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="+256 769 189 155"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select Project Type</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="game">Game Development</option>
                  <option value="enterprise">Enterprise Software</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Budget Range (USD)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select Budget</option>
                  <option value="5k-15k">UGX500,000 - UGX750,000</option>
                  <option value="15k-30k">UGX750,000 - UGX1,500,000</option>
                  <option value="30k-60k">UGX1,500,000 - UGX3,000,000</option>
                  <option value="60k+">UGX3,000,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 transition-colors"
              >
                <option value="">When do you want to start?</option>
                <option value="immediate">Immediately</option>
                <option value="1month">Within 1 month</option>
                <option value="3months">Within 3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={7}
                className="w-full bg-zinc-900 border border-white/10 rounded-3xl px-6 py-5 focus:outline-none focus:border-violet-500 transition-colors resize-y min-h-[160px]"
                placeholder="Describe your project, goals, target audience, key features, and any specific requirements..."
              />
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white hover:bg-zinc-100 text-black font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending your vision..." : (
                <>
                  Submit Project Brief <Send size={20} />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-zinc-500">
              We usually respond within 24 hours
            </p>
          </form>
        ) : (
          /* Success State with Confetti */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <CheckCircle className="w-24 h-24 mx-auto text-emerald-500 mb-8" />
            <h2 className="text-5xl font-bold mb-4">Thank You!</h2>
            <p className="text-2xl text-zinc-300 mb-6">
              Your vision has been received.
            </p>
            <p className="text-emerald-400 text-lg mb-12">
              Our team will contact you within 24 hours.
            </p>

            <Link 
              href="/#products"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-lg font-medium transition-colors"
            >
              ← Return to Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BuildPage;