import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "inquiries.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await fs.mkdir(DATA_DIR, { recursive: true });

    let inquiries: any[] = [];
    try {
      const raw = await fs.readFile(FILE, "utf-8");
      const parsed = JSON.parse(raw);
      inquiries = Array.isArray(parsed.inquiries) ? parsed.inquiries : [];
    } catch {
      inquiries = [];
    }

    inquiries.push({
      id: `inq-${Date.now()}`,
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      country: body.country,
      quantity: body.quantity,
      message: body.message,
      categories: body.categories ?? [],
      selectedProducts: body.selectedProducts ?? [],
      createdAt: new Date().toISOString(),
    });

    await fs.writeFile(
      FILE,
      JSON.stringify({ inquiries }, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return NextResponse.json(
      { error: "Failed to save inquiry" },
      { status: 500 }
    );
  }
}