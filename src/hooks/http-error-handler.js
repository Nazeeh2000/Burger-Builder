import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptors = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptors = httpClient.interceptors.response.use(
    (response) => response,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    // console.log('Will Unmount', this.reqInterceptors, this.resInterceptors);
    return () => {
      httpClient.interceptors.request.eject(reqInterceptors);
      httpClient.interceptors.response.eject(resInterceptors);
    };
  }, [reqInterceptors, resInterceptors]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
