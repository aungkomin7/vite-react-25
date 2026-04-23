import { supabase } from "../lib/supabase";
import useSWR from "swr";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) throw error;
  return data;
};

const SupabaseTesting = () => {
  const { data, isLoading, error } = useSWR("products", fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  console.log(data);

  return (
    <div>
      <h1>Products</h1>
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default SupabaseTesting;