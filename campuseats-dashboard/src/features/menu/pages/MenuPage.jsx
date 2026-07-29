import MenuList from "../components/MenuList";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  const { data: dishes, isLoading, error } = useFetch("/menu.json");
  
  if (isLoading) return <p>Loading menu…</p>; // 1. loading

  if (error) return <p>Could not load menu: {error}</p>; // 2. error

  const filtered = dishes?.filter((d) => 
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
      />
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;