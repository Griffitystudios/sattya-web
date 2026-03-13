// import { NextResponse } from 'next/server';
// import { eventsService } from '../../../domains/events/services/events.service';
// import { getEvents } from '../../../domains/events/queries/getEvents';

// export async function GET() {
//   try {
//     const events = await getEvents();
//     return NextResponse.json(events);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const event = await eventsService.create(data);
//     return NextResponse.json(event, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
//   }
// }


import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Your login logic here
        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({error: 'Login failed'}, {status: 400});
    }
}