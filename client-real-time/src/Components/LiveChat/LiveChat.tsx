import React, { useState } from "react"
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL);

export const LiveChat = ({ status }): JSX.Element => {
    const [count, setCounter] = useState(0)

    

    return (
        <>
            Live chat

            {/* {count} */}
            status: {status}

            {/* <button onClick={() => {
                setCounter(count + 1)
            }}>Click to count</button> */}
        </>
    )
}