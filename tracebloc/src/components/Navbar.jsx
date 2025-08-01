import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Moon, Sun, Bell, User } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar({ user }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null; // Hide navbar for unauthenticated users

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-black shadow-md">
      <Link to="/dashboard" className="text-xl font-bold text-orange-500">
        TraceBloc
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="text-white" /> : <Moon />}
        </Button>

        <Bell className="text-orange-500 cursor-pointer" />

        <Link to="/profile">
          <User className="text-gray-700 dark:text-white" />
        </Link>

        <Button onClick={handleLogout} variant="outline" className="text-sm">
          Logout
        </Button>
      </div>
    </nav>
  );
}