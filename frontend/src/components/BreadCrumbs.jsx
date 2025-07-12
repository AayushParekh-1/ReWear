import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => (
  <nav className="text-sm mb-4">
    {links.map((link, index) => (
      <span key={index}>
        <Link to={link.path} className="text-blue-600 hover:underline">
          {link.label}
        </Link>
        {index < links.length - 1 && <span className="mx-2 text-gray-400">/</span>}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
