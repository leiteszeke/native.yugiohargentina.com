// Dependencies
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ height, latitude, longitude, width }) => (
    <View style={{
        height: height || '100%',
        width: width || '100%',
    }}>
        <MapView
            region={{
                latitude,
                latitudeDelta: 0.005,
                longitude,
                longitudeDelta: 0.005,
            }}
            scrollEnabled={ false }
            style={{ borderRadius: 4, flex: 1 }}
            zoomControlEnabled={ false }
            zoomEnabled={ false }
            zoomTapEnabled={ false }
        >
            <Marker
                coordinate={{
                    latitude,
                    longitude,
                }}
            />
        </MapView>
    </View>
);

export default Map;