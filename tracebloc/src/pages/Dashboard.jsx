import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Dashboard() {
  const { user } = useUser(); // access user from context
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoadingUser(false);
        }
      }
    };

    const fetchProducts = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const res = await axios.get("http://localhost:8000/api/products/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(res.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoadingProducts(false);
        }
      }
    };

    fetchUserData();
    fetchProducts();
  }, [user]);

  if (loadingUser || loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <LoaderCircle className="animate-spin mr-2" />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Welcome, {userData?.name || "User"}!
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">Profile Info</h2>
        <p className="text-gray-300 mt-2">
          <strong>Bio:</strong> {userData?.bio || "No bio added."}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">Your Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 p-4 rounded-2xl shadow-md border border-zinc-800"
              >
                <h3 className="text-xl font-semibold text-orange-400">
                  {product.name}
                </h3>
                <p className="text-gray-300">{product.description}</p>
                <p className="mt-2 font-bold text-white">₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}