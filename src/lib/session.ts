import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  admin?: boolean;
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    cookieName: "rg_admin",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export async function isAdmin() {
  const session = await getSession();
  return session.admin === true;
}
