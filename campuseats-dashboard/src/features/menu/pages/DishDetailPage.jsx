import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch("/menu.json");

  if (isLoading) return <p>Loading dish details...</p>;
  if (error) return <p>Could not load dish details: {error}</p>;

  const dish = dishes?.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <div className="dish-detail-page">
        <p>Dish not found.</p>
        <Link to="/">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail-page">
      <div className="dish-detail-card">
        <div className="dish-detail-badge">
          {dish.available ? "Available now" : "Currently sold out"}
        </div>

        <h2>{dish.name}</h2>
        <p className="dish-detail-price">Rs. {dish.price.toFixed(2)}</p>

        <div className="dish-detail-meta">
          <span>{dish.category}</span>
          <span>{dish.available ? "Ready to order" : "Unavailable"}</span>
        </div>

        <p className="dish-detail-description">
          A customer favorite from Campus Eats, prepared fresh and served with
          bold flavor and satisfying portions.
        </p>

        <Link className="dish-detail-back" to="/">
          Back to menu
        </Link>
      </div>
    </div>
  );
}

export default DishDetailPage;
