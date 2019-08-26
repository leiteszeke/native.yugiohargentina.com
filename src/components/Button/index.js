// Dependencies
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ buttonColor, onPress, text, textColor }) => (
    <TouchableOpacity
        onPress={ onPress }
        style={{
            alignItems: 'center',
            backgroundColor: buttonColor,
            borderRadius: 4,
            height: 40,
            justifyContent: 'center',
        }}
    >
        <Text
            style={{
                color: textColor,
                fontSize: 18,
                fontWeight: 'bold',
            }}
        >
            { text.toUpperCase() }
        </Text>
    </TouchableOpacity>
);

Button.defaultProps = {
    buttonColor: '#FF0000',
    textColor: '#FFFFFF',
};

Button.propTypes = {
    buttonColor: PropTypes.string,
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
};

export default Button;