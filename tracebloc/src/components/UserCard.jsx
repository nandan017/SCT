import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition">
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt={user.displayName}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex-1">
        <Link
          to={`/user/${user.uid}`}
          className="text-lg font-semibold hover:underline"
        >
          {user.displayName || "Unnamed User"}
        </Link>
        <p className="text-gray-500">{user.bio || "No bio added"}</p>
      </div>

      <div className="flex items-center gap-1 text-sm">
        <FaCircle
          className={user.online ? "text-green-500" : "text-gray-400"}
        />
        <span>{user.online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
}