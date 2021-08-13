import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
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