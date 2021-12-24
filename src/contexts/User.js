// Dependencies
import React from 'react';
// import * as Sentry from '@sentry/react-native';
// Helpers
import { getSession, setSession } from '#helpers/session';
// Services
import { me } from '#services/users';
import { navigate } from '#services/navigation';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});

  const fetchUser = async () => {
    const session = await getSession();
    setUser(session);
  };

  const handleSession = async () => {
    const session = await getSession();

    if (session && session.id) {
      if (session.id > 0) {
        // Sentry.configureScope(scope =>
        //   scope.setUser({
        //     id: session?.id,
        //     email: session?.email,
        //   }),
        // );
      }

      return navigate('App');
    }

    return navigate('Auth');
  };

  const updateUser = () =>
    me().then(async (res) => {
      await setSession(res.data);
      fetchUser();
    });

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, handleSession, updateUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const userContext = React.useContext(UserContext);
  return userContext;
};

export { UserProvider, useUser };
