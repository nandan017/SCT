import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { displayName: newDisplayName });

      setShowModal(false);
      window.location.reload(); // simple refresh to update context changes
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Profile</h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
        <p className="text-gray-400 mb-2">Display Name:</p>
        <h2 className="text-xl font-semibold text-orange-400 mb-4">
          {user?.displayName || "N/A"}
        </h2>

        <p className="text-gray-400 mb-2">Email:</p>
        <h2 className="text-xl font-semibold text-orange-400 mb-6">
          {user?.email || "N/A"}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <label className="block mb-2 font-semibold">Display Name</label>
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;