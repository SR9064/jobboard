import { NextResponse } from "next/server";
import { getAllJobs, addJob } from "@/lib/jobs";

export async function GET() {
  return NextResponse.json(getAllJobs());
}

export async function POST(request) {
  const body = await request.json();

  if (!body.title || !body.company || !body.location) {
    return NextResponse.json(
      { error: "title, company, and location are required." },
      { status: 400 }
    );
  }

  const job = addJob(body);
  return NextResponse.json(job, { status: 201 });
}
