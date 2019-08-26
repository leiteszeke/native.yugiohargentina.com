// Dependencies
import React from 'react';
import NavigationContext from "./context";

export const useNavigation = () => {
    const { actions } = React.useContext(NavigationContext);
    return actions;
}