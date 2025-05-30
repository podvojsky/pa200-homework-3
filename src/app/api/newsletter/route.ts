import { NextResponse } from 'next/server';
import { sendToQueue } from '@/lib/serviceBus';

export async function POST(req: Request) {
	const { emails, message } = await req.json();

	if (!emails || !message) {
		return NextResponse.json({ error: 'Missing emails or message' }, { status: 400 });
	}

	const emailList = emails
		.split(/[\n,]+/)
		.map((e: string) => e.trim())
		.filter((e: string) => e.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

	if (emailList.length === 0) {
		return NextResponse.json({ error: 'No valid email addresses' }, { status: 400 });
	}

	try {
		await sendToQueue(
			emailList.map((email: any) => ({
				body: { email, message },
			}))
		);

		return NextResponse.json({ success: true, count: emailList.length });
	} catch (error) {
		console.error('Queue send error:', error);
		return NextResponse.json({ error: 'Failed to queue messages' }, { status: 500 });
	}
}
