// app/api/subscribe/route.js
// Subscribes a user to The Pulse via Kit (ConvertKit) v3 API
// Requires CONVERTKIT_API_KEY in your .env.local

import { NextResponse } from 'next/server';

const KIT_API_KEY = process.env.CONVERTKIT_API_KEY;

// Your Kit Form ID — get this from:
// Kit Dashboard → Landing Pages & Forms → The Pulse form → Settings → ID
const KIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.error('Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID env vars');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Subscribe via Kit v3 API
    const kitRes = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          first_name: firstName || '',
        }),
      }
    );

    const kitData = await kitRes.json();

    if (!kitRes.ok) {
      console.error('Kit API error:', kitData);
      return NextResponse.json(
        { error: kitData.message || 'Subscription failed. Please try again.' },
        { status: kitRes.status }
      );
    }

    return NextResponse.json({ success: true, subscriber: kitData.subscription });

  } catch (err) {
    console.error('Subscribe route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
