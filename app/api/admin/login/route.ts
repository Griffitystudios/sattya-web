// import { NextResponse } from 'next/server';
// import { adminService } from '../../../../domains/admin/services/admin.service';

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();
//     const session = await adminService.login(email, password);

//     if (!session) {
//       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//     }

//     return NextResponse.json(session, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Login failed' }, { status: 500 });
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