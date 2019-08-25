// Dependencies
import React from 'react';
import { Image, Text, View } from 'react-native';
// Components
import Layout from '../../components/Layout';

const Item = ({ timetable, title, users }) => (
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

const Events = () => {
    const generateList = () => {
        const users = new Array(Math.floor(Math.random() * 10) + 1).fill([]);

        return {
            list: users.filter((item, i) => i < 6),
            rest: users.length - 6,
        }
    }

    return (
        <Layout title="Eventos">
            <Text style={{ fontSize: 18, marginTop: 6, marginBottom: 12 }}>Today, August 25</Text>
            <Item title="WCQ Regional" timetable="10:00 AM - 11:00 AM" users={ generateList() } />
            <Item title="WCQ Regional" timetable="10:00 AM - 11:00 AM" users={ generateList() } />
        </Layout>
    )
}

export default Events;