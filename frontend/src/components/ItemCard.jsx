// src/components/ItemCard.jsx
import { Link } from "react-router-dom";

const ItemCard = ({ id, image, title, status }) => (
  <Link to={`/item/${id}`} className="block rounded overflow-hidden shadow hover:shadow-lg transition">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className={`text-sm ${status === 'Available' ? 'text-green-600' : 'text-gray-500'}`}>
        {status}
      </span>
    </div>
  </Link>
);

export default ItemCard;
