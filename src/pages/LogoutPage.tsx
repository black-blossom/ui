import { useEffect } from 'react';
import { useLocation } from 'wouter';

import useAuthStore from './../hooks/useAuth';

const LogoutPage = () => {
  const useDeauthenticate = useAuthStore(state => state.deauhenticate);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    useDeauthenticate();
    setLocation('/trade', { replace: true })
  }, []);

  return (
    <>
    </>
  );
};

export default LogoutPage;
