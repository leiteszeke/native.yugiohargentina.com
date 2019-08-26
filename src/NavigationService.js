import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
}

export const goTo = url => {
    _navigator.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: url })],
    }));
}