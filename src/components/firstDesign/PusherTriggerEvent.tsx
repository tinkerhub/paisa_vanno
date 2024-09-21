import { useState } from 'react';

const TriggerEventComponent = () => {
  const [message, setMessage] = useState('');

  const triggerPusherEvent = async () => {
    try {
      const res = await fetch('/api/trigger-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.success) {
        console.log('Event triggered successfully');
      } else {
        console.error('Event trigger failed:', data.error);
      }
    } catch (error) {
      console.error('Error triggering event:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={triggerPusherEvent}>Trigger Pusher Event</button>
    </div>
  );
};

export default TriggerEventComponent;
