import useSWR, { mutate } from "swr";
import { createProduct, fetcher, productApiUrl } from "../services/products";
import { useForm } from "react-hook-form";

const FetchTesting = () => {
  const { data = [], isLoading, error } = useSWR(productApiUrl, fetcher);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const res = await createProduct({ name: formData.username });

      if (!res.ok) {
        throw new Error("Create failed");
      }

      // Revalidate data
      await mutate(productApiUrl);

      // Reset form
      reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (error)
    return <div className="text-red-500">Failed to fetch products</div>;

  if (isLoading) return <p>Loading...</p>;

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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-20 space-x-2">
        <input
          className="border px-3 py-1"
          {...register("username", { required: true })}
          type="text"
        />

        <button
          className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
          type="submit"
        >
          Add
        </button>

        {errors.username && (
          <p className="text-red-500">This field is required</p>
        )}
      </form>
    </div>
  );
};

export default FetchTesting;
