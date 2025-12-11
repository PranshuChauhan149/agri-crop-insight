import { useState, useContext } from "react";
import { Mail, Phone, MapPin, Loader2, Send, User } from "lucide-react";
import AppContext from "../Context/AppContext";
import axios from "axios";
import { serrverUrl } from "../main";
import toast from "react-hot-toast";

export default function Contact() {
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const name = user?.name || "";
  const email = user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      alert("Please write a message");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${serrverUrl}/api/user/contact`,
        { name, email, message },
        { withCredentials: true }
      );

      setLoading(false);
      setMessage("");
      toast.success("Message sent successfully ✅");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-300 to-green-200 px-4 py-14 flex items-center justify-center">
      
      <div className="bg-white/90 max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden border border-green-400 grid md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-green-700 to-green-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Smart Agro AI 🌱</h2>
            <p className="text-green-100 mb-8">
              Have a question or need support? We’re here to help!
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail size={20} /> <span>support@smartagroai.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} /> <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} /> <span>India (Remote Support)</span>
              </div>
            </div>
          </div>

          <p className="text-green-200 text-sm mt-10">
            © {new Date().getFullYear()} Smart Agro AI. All rights reserved.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-10 bg-white">
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="w-full bg-gray-100 border rounded-lg px-4 py-2 pl-10"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-gray-100 border rounded-lg px-4 py-2 pl-10"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
