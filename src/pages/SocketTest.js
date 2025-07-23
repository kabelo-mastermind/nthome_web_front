import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:8085');

const SocketTest = () => {
    useEffect(() => {
        // Listen for the test message from the server
        socket.on('testMessage', (data) => {
            console.log(data.message); // Log the message received from the server
        });

        // Clean up the listener when the component unmounts
        return () => {
            socket.off('testMessage');
        };
    }, []);

    return (
        <div>
            <h1>Socket.IO Connection Test</h1>
            <p>Open the console to see the connection status.</p>
        </div>
    );
};

export default SocketTest;