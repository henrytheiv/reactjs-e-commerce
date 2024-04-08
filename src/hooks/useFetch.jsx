import { useState } from "react";
import { useEffect } from "react";

// Hook name
// This hook will call the API based on the given param
// When new param is passed, it will call the new URL
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Once the hook is called/ created, call the API and return the data
  // Everytime the URL changes, it will call back the API to new URL
  useEffect(() => {

    // function definition
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    // function execution
    fetchData();
  }, [url]);

  // The data returned by the hook
  return { data, error };
};

