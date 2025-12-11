import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import icon from "../../public/agroIcon.png"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-12 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">

        {/* ✅ BRAND */}
        <div>
         <div className="flex items-center justify-center gap-2">
           <h2 className="text-2xl font-bold text-green-500 mb-4">
            SmartAgro
          </h2>
           <img src={icon} className="w-7" alt="" />
         </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            AI-powered smart farming solution for crop health, soil monitoring,
            pest prediction and weather-based advisory for modern farmers.
          </p>

          <div className="flex gap-4 mt-5">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaInstagram />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
          </div>
        </div>

        {/* ✅ QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="/dashboard">Dashboard</FooterLink></li>
            <li><FooterLink to="/signup">Sign Up</FooterLink></li>
          </ul>
        </div>

        {/* ✅ SERVICES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>AI Crop Disease Detection</li>
            <li>Soil Health Analysis</li>
            <li>Pest Risk Prediction</li>
            <li>Weather Advisory</li>
            <li>Smart Crop Planning</li>
          </ul>
        </div>

        {/* ✅ CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-green-500" />
              support@smartagroai.com
            </li>

            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-500" />
              +91 98765 43210
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              India (Remote Support)
            </li>
          </ul>
        </div>

      </div>

      {/* ✅ BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Smart Agro AI. All rights reserved.
      </div>
    </footer>
  );
}

/* ✅ Reusable Components */

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="hover:text-green-400 transition"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center
      hover:bg-green-500 hover:text-white transition cursor-pointer"
    >
      {icon}
    </div>
  );
}
