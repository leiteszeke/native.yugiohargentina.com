// Dependencies
import React, { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
// Components
import Header from '../Header';
import Footer from '../Footer';

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

const Layout = ({ children, footer, noScroll, header, title }) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 32;

  const onContentChange = (width, height) => {
    setScrollEnabled(height > Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING);
  }

  const contentProps = { onContentChange, noScroll, scrollEnabled };

  return (
    <SafeAreaView style={{ backgroundColor: '#f0f2f5', height: '100%', width: '100%' }}>
      { header && <Header title={title} /> }
      <Content { ...contentProps }>
        { children }
      </Content>
      { footer && <Footer>{ footer }</Footer> }
    </SafeAreaView>
  )
}

Layout.defaultProps = {
  footer: false,
};

export default Layout;