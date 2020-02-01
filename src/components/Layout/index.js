// Dependencies
import React, { useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
// Components
import Header from '#components/Header';
import Footer from '#components/Footer';
import Loader from '#components/Loader';
// Images
import bgImage from '#images/bg.png'

const Layout = ({
  background = false,
  events,
  children,
  footer,
  noScroll,
  header,
  headerActions,
  title,
}) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width, height) => {
    setScrollEnabled(height > Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING);
  }

  const Content = noScroll ? View : ScrollView;

  if (background) {
    return (
      <ImageBackground source={ bgImage } style={{ flex: 1 }}>
        <SafeAreaView
          forceInset={{ bottom: 'always' }}
          style={{
            backgroundColor: background ? 'transparent' : '#f0f2f5',
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
            contentContainerStyle={{ flex: 1 }}
            behavior="position"
            style={{ flex: 1 }}
          >
            { header && <Header title={title} /> }
            <Content
              onContentSizeChange={ onContentChange }
              scrollEnabled={ scrollEnabled }
              style={{
                flex: 1,
                padding: 16,
                width: '100%',
              }}
            >
              { children }
            </Content>
            { footer && <Footer>{ footer }</Footer> }
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    )
  }

  return (
    <>
      <SafeAreaView
        forceInset="always"
        style={{
          backgroundColor: background ? 'transparent' : '#f0f2f5',
          flex: 1,
          paddingBottom: 16,
        }}
      >
        <NavigationEvents {...events} />
        { header && <Header actions={headerActions || []} title={title} /> }
        <Content
          onContentSizeChange={ onContentChange }
          scrollEnabled={ scrollEnabled }
          contentContainerStyle={{
            paddingBottom: 16,
          }}
          style={{
            flex: 1,
            padding: 16,
            width: '100%',
          }}
        >
          { children }
        </Content>
        { footer && <Footer>{ footer }</Footer> }
      </SafeAreaView>
      <Loader />
    </>
  )
}

Layout.defaultProps = {
  footer: false,
};

export default Layout;