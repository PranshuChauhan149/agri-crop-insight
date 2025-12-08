import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { serrverUrl } from "../main";

const ProfilePage = () => {
  const { user, current } = useContext(AppContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    location: user?.location || "",
  });

  const [preview, setPreview] = useState(user?.image || null);
  const [image, setImage] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Please login to view your profile.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("location", formData.location);
      if (image) form.append("image", image);

      const res = await axios.put(
        `${serrverUrl}/api/user/update-profile`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile Updated Successfully");
        setEditMode(false);
        await current();
      }
    } catch (err) {
      toast.error("Profile Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-green-500 to-green-700" />

        <div className="relative flex flex-col items-center -mt-16 px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-4 border-white"
          >
            {preview ? (
              <img
                src={preview}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-5xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </motion.div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user?.name}
          </h2>
          <p className="text-gray-500">{user?.email}</p>

          {user?.location && (
            <p className="mt-1 text-sm text-gray-600">
              📍 {user?.location}
            </p>
          )}
        </div>

        {!editMode && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 px-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center shadow">
                <h3 className="text-xl font-bold text-green-700">
                  {user?.farms?.length || 0}
                </h3>
                <p className="text-gray-500">Total Farms</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center shadow">
                <h3 className="text-xl font-bold text-green-700">
                  {new Date(user?.createdAt).getFullYear()}
                </h3>
                <p className="text-gray-500">Joined Year</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center shadow">
                <h3 className="text-xl font-bold text-green-700">Active</h3>
                <p className="text-gray-500">Status</p>
              </div>
            </div>

            <div className="mt-10 px-6 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Email Address</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.location || "Not Set"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Total Farms</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.farms?.length || 0}
                </p>
              </div>
            </div>

            <div className="px-6 pb-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setEditMode(true)}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700"
              >
                Edit Profile
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/dashboard")}
                className="flex-1 border border-green-600 text-green-700 py-3 rounded-xl hover:bg-green-50"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </>
        )}

        {editMode && (
          <div className="px-6 pb-8 mt-10 space-y-5">
            <div>
              <input
                type="file"
                onChange={handleImage}
                className="block w-full mt-1"
              />
            </div>

            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>

            <div>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleUpdate}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700"
              >
                Save Changes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setEditMode(false)}
                className="flex-1 border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-50"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
