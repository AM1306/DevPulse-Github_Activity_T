import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError(`Error: ${res.status}`);
          return;
        }

        const responseData = await res.json();
        setData(responseData);
      } catch (err) {
        setError("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
