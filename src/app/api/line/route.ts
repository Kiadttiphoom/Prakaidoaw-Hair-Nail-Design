import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINE_CALLBACK_URL!,
      client_id: process.env.LINE_CHANNEL_ID!,
      client_secret: process.env.LINE_CHANNEL_SECRET!,
    }),
  });

  const tokenData = await tokenRes.json();
  if (tokenData.error) {
    return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
  }

  // ดึงข้อมูลโปรไฟล์
  const profileRes = await fetch("https://api.line.me/v2/profile", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profile = await profileRes.json();

  // เก็บ cookie (เพื่อให้ client โหลดมาทีหลัง)
  const res = NextResponse.redirect(new URL("/booking", req.url));
  res.cookies.set("line_user", JSON.stringify(profile), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
