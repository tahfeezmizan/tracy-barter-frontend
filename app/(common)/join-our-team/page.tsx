"use client";

import { useState } from "react";

export default function JoinOurTeamPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You will connect this to your API route later
    console.log(form);
    alert("Thank you! We will contact you soon.");
  };

  return (
    <section className="text-slate-100 min-h-screen py-24" style={{
        background: `linear-gradient(to bottom, #fbf8f0 92%, #f0f1f5ad 80%)`,
      }}>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl border text-black">
        
       <div className="w-full md:max-w-3xl mx-auto text-center">
         {/* Header */}
        <div className="mb-6">
          {/* <div className="bg-white rounded-lg p-2">
            <Home className="h-6 w-6 text-slate-900" />
          </div> */}
          <div>
            <h1 className="text-3xl font-semibold ">
              Join Our Team
            </h1>
            <p className="text-slate-400 text-sm">
              Happy Valley Home Concierge
            </p>
          </div>
        </div>

        <p className="text-slate-400 mb-12 leading-relaxed">
          We are always looking for dependable, detail-oriented professionals 
          who take pride in delivering exceptional home concierge services. 
          Please complete the form below and we will contact you to schedule 
          an employment interview.
        </p>
       </div>

        {/* Form Card */}
        <div className="w-full md:max-w-3xl mx-auto bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="text-white block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-white block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-white block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-slate-900 font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
