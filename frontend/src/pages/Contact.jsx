import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, Send, User } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  // ✅ Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // ✅ Demo submit (UI only)
    setTimeout(() => {
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
      alert("Message sent successfully ✅");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* ✅ LEFT SIDE - INFO */}
        <div className="bg-green-700 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Smart Agro AI 🌱</h2>
            <p className="text-green-100 mb-8">
              Have a question, suggestion, or need help with your crops?  
              We are always here to help farmers.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail />
                <span>support@smartagroai.com</span>
              </div>

              <div className="flex items-center gap-4">
                <Phone />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin />
                <span>India (Remote Support Available)</span>
              </div>
            </div>
          </div>

          <p className="text-green-200 text-sm mt-10">
            © {new Date().getFullYear()} Smart Agro AI. All rights reserved.
          </p>
        </div>

        {/* ✅ RIGHT SIDE - FORM */}
        <div className="p-10">
          <h3 className="text-2xl font-bold text-green-700 mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ✅ Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-green-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* ✅ Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* ✅ Message */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
