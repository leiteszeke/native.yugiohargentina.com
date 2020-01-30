// Dependencies
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
// Helpers
import { getSession } from '#helpers/session';

class AuthLoadingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.authUser();
  }

  authUser = async () => {
    let session = await getSession();
    let navigateTo = 'Auth';

    if (session && session.id) {
      navigateTo = 'App';
    }

    this.props.navigation.navigate(navigateTo);
  };

  // eslint-disable-next-line
  render() {
    return <View />;
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AuthLoadingScreen;
