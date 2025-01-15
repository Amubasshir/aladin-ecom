import { db } from '@/lib/db';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    console.log('userId:', evt.data.id);
    const data = JSON.parse(body).data;
    console.log('user data---', data, id, eventType);
    const user: Partial<User> = {
      id: data.id,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email_addresses[0].email_addresses,
      picture: data.image_url,
    };
    if (!user) return;

    const dbUser = await db.user.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: {
        id: user.id!,
        name: user.name!,
        email: user.email!,
        picture: user.picture!,
        role: user.role || 'USER',
      },
    });

    await clerkClient.users.updateUserMetadata(data.id, {
      privateMetadata: {
        role: dbUser.role || 'USER',
      },
    });
  }

  return new Response('Webhook received', { status: 200 });
}
