// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Drawer from 'react-native-drawer';
import { SafeAreaView } from 'react-navigation';
// Hooks
import { useDrawer, useDrawerActions } from '../../modules/Drawer/hooks';
// Components
import Header from '../Header';
import Menu from '../Menu';

const DrawerOverlay = ({ show }) => {
    if (!show) return <View />;

    return <View style={{
        backgroundColor: '#000000',
        flex: 1,
        height: '100%',
        left: 0,
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        width: '100%',
    }} />
}

const Content = ({ children, noScroll, onContentChange, scrollEnabled }) => {
    const Component = noScroll ? View : ScrollView;

    return (
        <Component
            onContentSizeChange={ onContentChange }
            scrollEnabled={ scrollEnabled }
            style={{
                flex: 1,
                padding: 16,
                width: '100%',
            }}
        >
            { children }
        </Component>
    )
}

const Layout = ({ children, noScroll, title }) => {
    const drawerRef = useRef(null);
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const { show } = useDrawer();
    const { close, open, setRef } = useDrawerActions();
    const HEADER_HEIGHT = 50;
    const CONTENT_PADDING = 32;

    const onContentChange = (width, height) => {
        setScrollEnabled(height > Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING);
    }

    useEffect(() => {
        close();
        setRef(drawerRef);
    }, []);

    return (
        <Drawer
            closedDrawerOffset={ -3 }
            content={ <Menu /> }
            onCloseStart={ close }
            onOpenStart={ open }
            openDrawerOffset={ 0.2 }
            panCloseMask={ 0.2 }
            ref={ drawerRef }
            styles={{
                drawer: {
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000',
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                },
            }}
            tapToClose={ true }
            tweenHandler={ ratio => ({
                main: { opacity: (2 - ratio) / 2 }
            }) }
            type="overlay"
        >
            <SafeAreaView style={{ height: '100%', width: '100%' }}>
                <Header title={ title } />
                <Content
                    onContentChange={ onContentChange }
                    noScroll={ noScroll }
                    scrollEnabled={ scrollEnabled }
                >
                    { children }
                </Content>
            </SafeAreaView>
            <DrawerOverlay show={ show } />
        </Drawer>
    )
}

export default Layout;