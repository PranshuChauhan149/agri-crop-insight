import { useContext, useState, useRef } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { serrverUrl } from "../main";

const ProfilePage = () => {
  const { user, current } = useContext(AppContext);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(user?.image || null);
    // reset file input so same file can be re-picked
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
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
        // update preview from server if returned (optional)
        if (res.data.user?.image) setPreview(res.data.user.image);
      } else {
        toast.error(res.data.message || "Profile Update Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Profile Update Failed");
    } finally {
      setLoading(false);
    }
  };

  // Small helper for initials avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n?.[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Fancy header */}
        <div className="relative">
          <div className="h-44 bg-gradient-to-r from-green-400 via-emerald-600 to-teal-700" />
          {/* decorative blur */}
          <div className="absolute inset-x-0 top-0 h-44 -translate-y-6 opacity-60 pointer-events-none">
            <div className="w-full h-full backdrop-blur-sm" />
          </div>
        </div>

        <div className="relative px-8 -mt-20 pb-10">
          <div className="flex flex-col items-center">
            {/* Avatar with live preview and floating edit */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden border-8 border-white"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-600 text-white text-4xl font-extrabold">
                  {initials}
                </div>
              )}

              {/* edit overlay when in edit mode */}
           
            </motion.div>

            <h2 className="mt-5 text-2xl font-extrabold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-500 mt-1">{user?.email}</p>

            {user?.location && (
              <p className="mt-2 inline-flex items-center gap-2 text-sm rounded-full px-3 py-1 bg-green-50 text-green-700">
                📍 {user?.location}
              </p>
            )}
          </div>

          {/* Stats */}
          {!editMode && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
                <div className="bg-gradient-to-tr from-white to-green-50 rounded-2xl p-4 text-center drop-shadow-md border border-gray-50">
                  <h3 className="text-2xl font-bold text-green-700">
                    {user?.farms?.length || 0}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Total Farms</p>
                </div>

                <div className="bg-gradient-to-tr from-white to-green-50 rounded-2xl p-4 text-center drop-shadow-md border border-gray-50">
                  <h3 className="text-2xl font-bold text-green-700">
                    {new Date(user?.createdAt).getFullYear()}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Joined Year</p>
                </div>

                <div className="bg-gradient-to-tr from-white to-green-50 rounded-2xl p-4 text-center drop-shadow-md border border-gray-50">
                  <h3 className="text-2xl font-bold text-green-700">Active</h3>
                  <p className="text-sm text-gray-500 mt-1">Status</p>
                </div>
              </div>

              {/* details */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white border">
                  <p className="text-sm text-gray-400">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border">
                  <p className="text-sm text-gray-400">Email Address</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.email}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.location || "Not Set"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border">
                  <p className="text-sm text-gray-400">Total search</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.history?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setEditMode(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl shadow-lg"
                >
                  Edit Profile
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 border border-green-600 text-green-700 py-3 rounded-2xl hover:bg-green-50"
                >
                  Back to Dashboard
                </motion.button>
              </div>
            </>
          )}

          {/* EDIT MODE */}
          {editMode && (
            <div className="mt-8 p-6 bg-white rounded-2xl border shadow-sm">
              {/* Hidden input (for Change button / drag and drop extension later) */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                aria-hidden
              />

              {/* Styled file input area */}
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-2xl font-bold text-gray-500">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Upload a profile photo (JPG, PNG). Live preview shown.
                  </p>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium shadow hover:brightness-105"
                    >
                      Choose Photo
                    </button>

                    <button
                      onClick={handleRemoveImage}
                      className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Tip: square images work best.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-500">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-500">Location</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm text-gray-500">Email</span>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="mt-1 w-full border rounded-lg px-4 py-2 bg-gray-50 cursor-not-allowed"
                  />
                </label>
              </div>

              {/* buttons */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`flex-1 inline-flex items-center justify-center gap-3 rounded-2xl py-3 font-medium shadow ${
                    loading
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setEditMode(false);
                    // reset preview to original if user cancels
                    setPreview(user?.image || null);
                    setImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex-1 border border-red-300 text-red-600 py-3 rounded-2xl hover:bg-red-50"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
