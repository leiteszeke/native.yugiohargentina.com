// Dependencies
import React from 'react';
import { Text } from 'react-native';
// Components
import Layout from '../../components/Layout';
import Event from './components/Event';

const generateList = () => {
    const users = new Array(Math.floor(Math.random() * 10) + 1).fill([]);
    const MAX_USERS = 5;

    return {
        list: users.filter((item, i) => i < MAX_USERS),
        rest: users.length - MAX_USERS,
    }
}

const calendar = [
    {
        date: 'Today, August 25',
        events: [
            { id: 1, title: 'WCQ Regional', timetable: '10:00 AM - 11:00 AM', users: generateList() },
            { id: 2, title: 'WCQ Regional', timetable: '10:00 AM - 11:00 AM', users: generateList() },
        ]
    },
    {
        date: 'Monday, August 26',
        events: [
            { id: 3, title: 'WCQ Regional', timetable: '12:00 AM - 03:00 PM', users: generateList() },
            { id: 4, title: 'WCQ Regional', timetable: '02:00 PM - 11:00 PM', users: generateList() },
        ]
    },
];

const Events = () => {
    return (
        <Layout title="Eventos">
            { calendar.map(day => (
                <>
                    <Text style={{ fontSize: 18, marginTop: 6, marginBottom: 12 }}>
                        { day.date }
                    </Text>
                    { day.events.map(event => <Event key={ event.id } { ...event } />) }
                </>
            )) }
        </Layout>
    )
}

export default Events;