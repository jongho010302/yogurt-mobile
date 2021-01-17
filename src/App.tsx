import React, { useEffect, useState } from 'react';
import RootNavigation from './navigation';
import { useUser } from './hooks';
import { getJwtToken } from './utils/storage';

const App = () => {
  const { getUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = await getJwtToken();
      if (accessToken) {
        await getUser();
      }
    })();
  }, [getUser]);

  setTimeout(() => {
    setLoading(false);
  }, 1300);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return <RootNavigation />;
  }
};

export default App;
