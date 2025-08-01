import React, { useState } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProfileSetup = () => {
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName || !photo) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const photoRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);

      // Update Auth Profile
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      // Update Firestore user doc
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        photoURL,
        online: true, // Set status online
      });

      toast.success("Profile setup complete!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Error saving profile");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-orange-400">Profile Setup</h1>

        <div>
          <label className="block mb-2">Display Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-full"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;