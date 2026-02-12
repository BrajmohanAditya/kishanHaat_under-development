"use client";
import { brandName } from "@/app/contants";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">{brandName}</h2>
          <p className="mt-3 text-sm text-gray-300 max-w-xs">
            Fresh farm products, delivered — curated selection from trusted
            farmers.
          </p>

          <div className="flex gap-3 mt-4">
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white">
              <Facebook size={16} />
            </a>
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white">
              <Instagram size={16} />
            </a>
            <a className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Get to Know Us */}
        <div>
          <h3 className="text-sm font-semibold text-gray-100 mb-4">
            Get to Know Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/about" className="hover:text-[#ff9900]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#ff9900]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/seller" className="hover:text-[#ff9900]">
                Sell on {brandName}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#ff9900]">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-sm font-semibold text-gray-100 mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/help" className="hover:text-[#ff9900]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#ff9900]">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-[#ff9900]">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#ff9900]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Policies */}
        <div>
          <h3 className="text-sm font-semibold text-gray-100 mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/refund-policy" className="hover:text-[#ff9900]">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-[#ff9900]"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#ff9900]">
                Privacy Policy
              </Link>
            </li>
            <li className="mt-3 text-sm text-gray-300 flex items-center gap-2">
              <Mail size={16} /> info@yourstore.com
            </li>
            <li className="text-sm text-gray-300 flex items-center gap-2 mt-1">
              <Phone size={16} /> +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">{brandName}</span>. All
            rights reserved.
          </div>
          <div className="text-sm text-gray-400">
            Design by{" "}
            <span className="text-[#ff9900] font-semibold">
              Startup Web Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
