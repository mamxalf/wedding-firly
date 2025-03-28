import { NextResponse } from 'next/server';
import { saveRsvp } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Save to database
    await saveRsvp({
      name: data.name,
      attending: data.attending,
      guestCount: data.guestCount || '0',
      message: data.message
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to save RSVP' },
      { status: 500 }
    );
  }
}
