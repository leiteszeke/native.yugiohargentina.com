// Dependencies
import React from 'react';
import { Image, Text, View } from 'react-native';

const Event = ({ timetable, title, users }) => (
    <View style={{
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderLeftColor: 'red',
        borderLeftWidth: 6,
        borderRadius: 4,
        minHeight: 100,
        marginBottom: 20,
        padding: 16,
    }}>
        <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ title }</Text>
            <Text style={{ fontSize: 14, marginTop: 4 }}>{ timetable }</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            { users.list.map((user, index) => (
                <Image key={ index } style={{ backgroundColor: 'red', borderRadius: 16, height: 32, marginRight: 12, width: 32 }} />
            ))}

            { users.rest > 0 &&
                <View style={{ alignItems: 'center', backgroundColor: 'red', borderRadius: 16, height: 32, justifyContent: 'center', marginRight: 12, width: 32 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                        +{ users.rest }
                    </Text>
                </View>
            }
        </View>
    </View>
)

export default Event;