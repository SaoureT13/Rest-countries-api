import { useState, useEffect } from "react";

export function useFetch({ url, options }) {
  const [datas, setDatas] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          method: options.method || "GET",
          headers: {
            Accept: "application/json; charset=UTF-8",
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: statut: ${response.status}`);
        }

        const data = await response.json();
        setDatas(data);
      } catch (e) {
        // console.log(`Erreur lors de l'appel à l'API ${e}`)
        setErrors(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    datas,
    errors,
    loading,
  };
}
