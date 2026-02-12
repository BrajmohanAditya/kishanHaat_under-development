"use client";
import { brandName } from "@/app/contants";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-green-700 text-green-50 ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white">{brandName}</h2>
          <p className="mt-4 text-sm text-green-200 max-w-xs">
            Your trusted destination for fresh farm products directly from
            farmers.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a className="w-9 h-9 rounded-full text-green-900 flex items-center justify-center bg-white hover:text-blue-600 transition">
              <Facebook size={16} />
            </a>
            <a className="w-9 h-9 rounded-full text-green-900 flex items-center justify-center bg-white hover:text-pink-600 transition">
              <Instagram size={16} />
            </a>
            <a className="w-9 h-9 rounded-full text-green-900 flex items-center justify-center bg-white hover:text-blue-600 transition">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-lime-300">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li>
              <Link href="/products" className="hover:text-lime-300">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-lime-300">
                Categories
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-lime-300">
                Offers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-lime-300">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-lime-300">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li>
              <Link href="/refund-policy" className="hover:text-lime-300">
                Refund Policy{" "}
              </Link>
            </li>
            <li>
              <Link href="terms&conditions" className="hover:text-lime-300">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="privacy-policy" className="hover:text-lime-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-lime-300">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-green-200">
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@yourstore.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-700 py-4 text-center text-sm text-green-200">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-lime-300">{brandName}</span>. All
        rights reserved.
        <span className="font-bold"> Design by Startup Web Support</span>
      </div>
    </footer>
  );
}
