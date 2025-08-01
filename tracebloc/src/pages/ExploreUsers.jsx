import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ExploreUsers = () => {
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(usersData);
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Other Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <img
              src={user.photoURL}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <p className="text-lg font-semibold">{user.displayName}</p>
            <p className={`text-sm ${user.online ? "text-green-400" : "text-red-400"}`}>
              {user.online ? "Online" : "Offline"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreUsers;