// Dependencies
import React from 'react';
import { ImageBackground, View, SafeAreaView } from 'react-native';
// Images
import bgImage from '../../images/bg.png';

const Content = ({ children, withOpacity }) => {
    if (!withOpacity) {
        return (
            <SafeAreaView>
                { children }
            </SafeAreaView>
        );
    }

    return (
        <>
            <View style={{
                backgroundColor: '#FFFFFF',
                left: 0,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: 2,
            }} />
            <SafeAreaView style={{
                left: 0,
                height: '100%',
                position: 'relative',
                top: 0,
                width: '100%',
                zIndex: 3,
            }}>
                { children }
            </SafeAreaView>
        </>

    );
}

const Background = ({ children, withOpacity }) => {
    return (
        <>
            <ImageBackground source={ bgImage } style={{ height: '100%', width: '100%' }}>
                <Content withOpacity={ withOpacity }>
                    { children }
                </Content>
            </ImageBackground>
        </>
    )
}

export default Background;