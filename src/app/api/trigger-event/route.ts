// app/api/trigger-event/route.ts
import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher with your credentials
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.PUSHER_APP_CLUSTER as string,
  useTLS: true,
});

// Define the POST handler for triggering events
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Trigger the Pusher event
    await pusher.trigger('my-channel', 'my-event', {
      message: message || 'hello world',
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error triggering Pusher event:', error);
    return NextResponse.json({ success: false, error: 'Event trigger failed' }, { status: 500 });
  }
}
