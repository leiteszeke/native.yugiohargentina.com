// Dependencies
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  View,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// Components
import Header from '#components/Header';
import Footer from '#components/Footer';
import Loader from '#components/Loader';
// Images
import bgImage from '#images/bg.png';
// Types
import { MyObject } from '#types';
// Styles
import styles from './Layout.styles';

type LayoutProps = {
  background?: boolean;
  children?: React.FC<React.ReactNode> | null | any;
  containerStyle?: ViewStyle;
  footer?: React.FC<React.ReactNode>;
  header?: boolean;
  headerActions?: MyObject;
  noIcon?: boolean;
  noScroll?: boolean;
  style?: ViewStyle;
  title?: string;
  withBack?: boolean;
};

const Layout = ({
  background = false,
  children,
  containerStyle,
  footer,
  header,
  headerActions,
  noIcon,
  noScroll,
  style,
  title,
  withBack,
}: LayoutProps) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const HEADER_HEIGHT = 50;
  const CONTENT_PADDING = 50;
  const { goBack } = useNavigation();

  const onContentChange = (width: number, height: number) => {
    setScrollEnabled(
      height >
        Dimensions.get('window').height - HEADER_HEIGHT - CONTENT_PADDING,
    );
  };

  const onBack = () => goBack();
  const Content = noScroll ? View : ScrollView;

  if (background) {
    return (
      <ImageBackground source={bgImage} style={styles.flex}>
        <SafeAreaView
          style={[styles.safeArea, !background && styles.safeAreaBackground]}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
            contentContainerStyle={styles.flex}
            behavior="position"
            style={styles.flex}>
            {header && <Header {...{ noIcon, onBack, title, withBack }} />}
            <Content
              onContentSizeChange={onContentChange}
              scrollEnabled={scrollEnabled}
              style={[styles.content, style]}>
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
        style={[
          styles.safeAreaWithPadding,
          !background && styles.safeAreaBackground,
        ]}>
        {header && (
          <Header
            {...{
              actions: headerActions || [],
              noIcon,
              onBack,
              title,
              withBack,
            }}
          />
        )}
        <Content
          onContentSizeChange={onContentChange}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={[styles.container, containerStyle]}
          style={[
            styles.fullWidth,
            scrollEnabled && styles.contentWithScroll,
            style,
          ]}>
          {children}
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </SafeAreaView>
      <Loader />
    </>
  );
};

export default Layout;
