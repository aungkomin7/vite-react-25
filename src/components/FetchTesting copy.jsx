import { useEffect, useState } from "react";

const FetchTesting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ add error state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json(); // ✅ rename to avoid shadowing
        setData(result);
      } catch (err) {
        console.error(err.message);
        setError(err.message); // ✅ store error
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ✅ loading state
  if (loading) return <p>Loading...</p>;

  // ✅ error state
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">FetchTesting</h1>

      <div className="space-y-2">
        {data.length > 0 ? (
          data.map((el) => (
            <div key={el.id} className="p-3 border rounded-lg shadow-sm">
              <p className="font-semibold">{el.name}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default FetchTesting;
