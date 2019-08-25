// Dependencies
import React from 'react';

const DrawerContext = React.createContext();

const DrawerProvider = ({ children }) => {
    const [showDrawer, setShowDrawer] = React.useState(false);
    const [drawerRef, setDrawerRef] = React.useState(null);

    React.useEffect(() => {
        if (drawerRef) {
            if (showDrawer) {
                drawerRef.current.open();
            } else {
                drawerRef.current.close();
            }
        }
    }, [showDrawer]);

    const open = () => setShowDrawer(true);
    const close = () => setShowDrawer(false);
    const toggle = () => setShowDrawer(!showDrawer);
    const setRef = ref => setDrawerRef(ref);

    const state = {
        show: showDrawer,
        ref: drawerRef,
    };

    const actions = { open, close, toggle, setRef };

    return (
        <DrawerContext.Provider value={{ actions, state }}>
            { children }
        </DrawerContext.Provider>
    )
}

export { DrawerContext as default, DrawerProvider as Provider };