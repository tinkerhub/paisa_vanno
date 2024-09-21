import { useEffect } from 'react';
import Pusher from 'pusher-js';

const MyComponent = () => {
  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('d5cc2ee3ecf3aaebb91b', {
      cluster: 'ap2',
    });

   // Subscribe to the "my-channel"
   const channel = pusher.subscribe('my-channel');

   // Bind the "my-event" event to a function
   channel.bind('my-event', (data:string) => {
     console.log('Received event data:', data);
     // Your method logic to handle the event data
   });

   // Cleanup to unbind event and unsubscribe from the channel when the component unmounts
   return () => {
     channel.unbind_all(); // Unbind all events
     pusher.unsubscribe('my-channel'); // Unsubscribe from the channel
     pusher.disconnect(); // Disconnect the Pusher connection
   };
 }, []); // Empty dependency array ensures this effect runs only once

 return (
   <div>
     {/* Your component UI */}
     <h1>Real-time Events</h1>
   </div>
 );
};

export default MyComponent;