import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = localStorage.token;
    let isMounted = true;
    setLoading(true);
    axios.get(url, {
      headers: { Authorization: `Bearer ${auth}` }
    }).then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setError(null);
        }
      })
      .catch((e) => {
        if (isMounted) {
          setError(e);
          setData(null);
        }
      })
      .finally(() => isMounted && setLoading(false));
    return () => (isMounted = false);
  }, [url, options])
  return {loading, data, error}
};

export default useFetch;