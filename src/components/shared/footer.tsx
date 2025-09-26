"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="w-auto container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 -mt-4  ">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-24"
                />
              </Link>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed mt-10">
              Your go-to choice for fast and fresh delivery, bringing the best
              to your door in no time
            </p>

            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Linkedin className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Link</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  How We works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Link</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Faq
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Subscribe Our newsletter to get our Latest Update & News
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter Email"
                className="flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-l-lg border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors duration-200"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg transition-colors duration-200 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-400">© 2024 Tweet. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
