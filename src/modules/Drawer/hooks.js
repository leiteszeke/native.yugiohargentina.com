// Dependencies
import React from 'react';
import DrawerContext from "./context";

export const useDrawer = () => {
  const { state } = React.useContext(DrawerContext);
  return state;
}

export const useDrawerActions = () => {
    const { actions } = React.useContext(DrawerContext);
    return actions;
}