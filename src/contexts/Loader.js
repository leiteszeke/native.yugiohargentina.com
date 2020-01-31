// Dependencies
import React from 'react';

const LoaderContext = React.createContext(null);

const LoaderProvider = ({ children }) => {
  const [show, setShow] = React.useState(true);
  const showLoader = () => setShow(true);
  const hideLoader = () => setShow(false);

  return (
    <LoaderContext.Provider
      value={{ isLoading: show, show, showLoader, hideLoader }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

const useLoader = () => {
  const loaderContext = React.useContext(LoaderContext)
  return loaderContext
}

export { LoaderProvider, useLoader };