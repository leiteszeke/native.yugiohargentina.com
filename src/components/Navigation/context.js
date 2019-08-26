// Dependencies
import React from 'react';

export const NavigationContext = React.createContext();

const NavigationProvider = ({ children }) => {
    const goTo = url => {
        navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: url })],
        }));
    }

    const actions = {
        goTo,
    };

    return (
        <Navigation.Provider value={{ actions }}>
            { children }
        </Navigation.Provider>
    )
}

export default withNavigation(NavigationProvider);