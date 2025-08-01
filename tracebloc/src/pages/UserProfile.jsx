import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const UserProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    };
    fetchProfile();
  }, [uid]);

  if (!user) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
      <img
        src={user.photoURL || "https://via.placeholder.com/150"}
        alt="profile"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h1 className="text-3xl font-bold text-orange-400">{user.displayName}</h1>
      <p className="text-lg mt-2">
        Status:{" "}
        <span className={user.online ? "text-green-400" : "text-red-400"}>
          {user.online ? "Online" : "Offline"}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;