// Dependencies
import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// Components
import Header from '#components/Header';
import Footer from '#components/Footer';
import Loader from '#components/Loader';
// Images
import bgImage from '#images/bg.png';

const Layout = ({
  background = false,
  children,
  footer,
  header,
  headerActions,
  noIcon,
  noScroll,
  style,
  title,
  withBack,
}) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;
  const {goBack} = useNavigation();

  const onContentChange = (width, height) => {
    setScrollEnabled(
      height >
        Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );
  };

  const onBack = () => goBack();
  const Content = noScroll ? View : ScrollView;

  if (background) {
    return (
      <ImageBackground source={bgImage} style={{flex: 1}}>
        <SafeAreaView
          forceInset={{bottom: 'always'}}
          style={{
            backgroundColor: background ? 'transparent' : '#f0f2f5',
            flex: 1,
          }}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
            contentContainerStyle={{flex: 1}}
            behavior="position"
            style={{flex: 1}}>
            {header && <Header {...{noIcon, onBack, title, withBack}} />}
            <Content
              onContentSizeChange={onContentChange}
              scrollEnabled={scrollEnabled}
              style={{
                flex: 1,
                padding: 16,
                width: '100%',
                ...style,
              }}>
              {children}
            </Content>
            {footer && <Footer>{footer}</Footer>}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <>
      <SafeAreaView
        forceInset="always"
        style={{
          backgroundColor: background ? 'transparent' : '#f0f2f5',
          flex: 1,
          paddingBottom: 16,
        }}>
        {header && (
          <Header
            {...{actions: headerActions || [], noIcon, onBack, title, withBack}}
          />
        )}
        <Content
          onContentSizeChange={onContentChange}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={[
            {
              paddingBottom: 16,
            },
            !scrollEnabled && {flex: 1},
          ]}
          style={{
            flex: 1,
            width: '100%',
            ...style,
          }}>
          {children}
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </SafeAreaView>
      <Loader />
    </>
  );
};

Layout.defaultProps = {
  footer: false,
  withBack: false,
};

export default Layout;
