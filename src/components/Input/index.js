// Dependencies
import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({ name, onChange, placeholder, secure }) => (
    <View style={{ height: 40, marginBottom: 12 }}>
        <TextInput
            name={ name }
            onChange={ onChange }
            placeholder={ placeholder }
            placeholderTextColor="black"
            secureTextEntry={ secure }
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                height: 40,
                width: '100%',
            }}
        />
    </View>
);

Input.defaultProps = {
    secure: false,
};

Input.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    secure: PropTypes.bool,
};

export default Input;