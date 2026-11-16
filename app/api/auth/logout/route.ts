import { NextResponse } from "next/server";
import { createServerClientForServer } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerClientForServer();
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}
