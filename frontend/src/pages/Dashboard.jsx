// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.BASE_URL}/api/items`, {
          params: { page, ownerId: currentUser?.uid }
        });

        setItems(res.data.items || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load items");
        setItems([]);      // fallback to prevent crash
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchItems();
    }
  }, [currentUser, page]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {currentUser?.email}
      </h1>
      <h2 className="text-xl mb-2">Your Items</h2>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items && items.length > 0 ? (
              items.map(item => (
                <ItemCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  image={item.imageUrl}
                  status={item.status}
                />
              ))
            ) : (
              <p>No items found. Start by adding some!</p>
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
