import React, { useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from './hooks';
import { setAxiosHeaders, getToken } from './utils/common';

const App = () => {
  const { handleCheckUser } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        setAxiosHeaders(token);
        handleCheckUser();
      }
    })();
  }, [handleCheckUser]);

  return <Navigation />;
};

export default App;
