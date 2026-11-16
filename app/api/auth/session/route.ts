import { NextResponse } from "next/server";
import { createServerClientForServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null, profile: null }, { status: 200 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return NextResponse.json({ user, profile });
}
