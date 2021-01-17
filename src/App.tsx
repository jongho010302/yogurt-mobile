import React, { useEffect, useState } from 'react';
// import RootNavigation from './navigation';
import { useUser } from './hooks';
import { getJwtToken } from './utils/storage';
import SplashScreen from './screen/auth/SplashScreen';
import RootNavigation from './navigation';

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
  }, 1);

  if (loading) {
    return <SplashScreen />;
  } else {
    return <RootNavigation />;
  }
};

export default App;
