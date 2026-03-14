import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@cozora.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin login not configured" },
      { status: 503 }
    );
  }

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
