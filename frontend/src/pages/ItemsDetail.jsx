// src/pages/ItemDetail.jsx
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const ItemDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Breadcrumbs links={[
        { path: "/", label: "Home" },
        { path: `/item/${id}`, label: "Item Detail" }
      ]}/>
      <h2 className="text-2xl font-bold mb-4">Item #{id}</h2>
      {/* Replace with real item data */}
      <img src="/blue-shirt.jpg" alt="Item" className="w-full h-64 object-cover rounded mb-4" />
      <p>Full item description here.</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Request Swap
      </button>
    </div>
  );
};

export default ItemDetail;
