// Dependencies
import React from 'react';
// Helpers
import {getSession} from '#helpers/session';
// Services
import {me} from '#services/users';

const UserContext = React.createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = React.useState({});

  const fetchUser = async () => {
    const session = await getSession();
    setUser(session);
  };

  const updateUser = () => me().then(u => setUser(u));

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{user, updateUser, fetchUser}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const userContext = React.useContext(UserContext);
  return userContext;
};

export {UserProvider, useUser};
