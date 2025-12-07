// import { useState, useEffect } from "react";
// import axios from "axios";
// import { socket } from "../socket";
// import toast from "react-hot-toast";

// export default function CropAI() {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [cropName, setCropName] = useState("");
//   const [location, setLocation] = useState("");
//   // const [plan, setPlan] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ SOCKET LISTENER
//   useEffect(() => {
//     socket.on("cropAlert", (data) => {
//       toast.success(data.message);
//     });

//     return () => socket.off("cropAlert");
//   }, []);

//   const generatePlan = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:3000/api/crop/generate", {
//         userName,
//         email,
//         cropName,
//         location,
//       });

//       setPlan(res.data.plan.plan);
//       toast.success("AI Crop Plan Generated & Email Sent ✅");
//     } catch (err) {
//       toast.error("AI Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-green-50">
//       <h1 className="text-3xl font-bold mb-6">🌱 AI Crop Learning System</h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           placeholder="Your Name"
//           className="border p-2"
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           className="border p-2"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           placeholder="Crop Name"
//           className="border p-2"
//           onChange={(e) => setCropName(e.target.value)}
//         />
//         <input
//           placeholder="Location"
//           className="border p-2"
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={generatePlan}
//         disabled={loading}
//         className="bg-green-600 text-white px-6 py-2 rounded"
//       >
//         {loading ? "Generating..." : "Generate AI Crop Plan"}
//       </button>

//       {/* ✅ SHOW AI PLAN */}
//       {plan && (
//         <div className="bg-white p-6 mt-8 rounded shadow">
//           <h2 className="text-xl font-bold mb-4">📅 AI Farming Schedule</h2>
//           <pre className="text-sm">{JSON.stringify(plan, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }
