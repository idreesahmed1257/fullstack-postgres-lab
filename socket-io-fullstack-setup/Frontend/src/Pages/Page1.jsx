import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Page1 = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            cors: {
                origin: 'http://localhost:5000',
            },
        });

        setSocket(socket);

        // Listen for incoming messages
        socket.on('notification', (notification) => {
            console.log('Received message:', message);
            setReceivedMessage(oldMessages => [...oldMessages, notification]);
        });

        socket.on('connectedd', (data) => {
            console.log('Connected!', data);
        }
        );

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (socket) {
                socket.on('disconnect', () => {
                    console.log('🔥: A user disconnected');
                })
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            // Send a message to the server
            socket.emit('message', message);
        }
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            {receivedMessage?.length}
            <div>
                {receivedMessage.map((message, index) => (
                    <p key={index}>{message}</p>
                ))
                }
            </div>
            {console.log(receivedMessage)}
        </div>
    );
};

export default Page1;