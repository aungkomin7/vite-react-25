export const productApiUrl = `${import.meta.env.VITE_API_URL}/products`;
export const fetcher = (...args) => fetch(...args).then((res) => res.json());



export const createProduct = (newProduct) => {
  return fetch(productApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
};