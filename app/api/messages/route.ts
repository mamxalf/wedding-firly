import { NextResponse } from "next/server";
import { getMessages } from "@/lib/db";

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
