import { NextResponse } from "next/server";
import { connectDB } from "../connect";
import Testinomials from "@/app/modals/testinomials";
import jwt from "jsonwebtoken";

async function verifyAdmin(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");
  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET!);
}

export async function GET() {
  await connectDB();
  const data = await Testinomials.find();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    await verifyAdmin(req);
    const body = await req.json();
    const hero = await Testinomials.create(body);
    return NextResponse.json(hero);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    await verifyAdmin(req);
    const { id, ...data } = await req.json();
    const updated = await Testinomials.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    await verifyAdmin(req);
    const { id } = await req.json();
    await Testinomials.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
