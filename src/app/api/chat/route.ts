import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cachedContext: string | null = null;
let cachedAt = 0;

async function getPortfolioContext(): Promise<string> {
  if (cachedContext && Date.now() - cachedAt < CACHE_TTL) {
    return cachedContext;
  }

  const [profile, skills, techSkills, tools, projects] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.skill.findMany({ orderBy: { id: "asc" } }),
    prisma.technicalSkill.findMany({ orderBy: { id: "asc" } }),
    prisma.tool.findMany({ orderBy: { id: "asc" } }),
    prisma.project.findMany({
      orderBy: { id: "desc" },
      include: {
        skills: { select: { name: true } },
      },
    }),
  ]);

  cachedContext = `
=== PORTFOLIO DATA (live from database) ===

## Profile
- Name: ${profile?.name || "N/A"}
- Nickname: ${profile?.nickName || "N/A"}
- Age: ${profile?.age || "N/A"}
- Description: ${profile?.description || "N/A"}

## Skills (Programming Languages & Frameworks)
${skills.map((s) => `- ${s.name}`).join("\n")}

## Technical Skills (with descriptions)
${techSkills.map((ts) => `- ${ts.name}: ${ts.description || "N/A"}`).join("\n")}

## Tools
${tools.map((t) => `- ${t.name}`).join("\n")}

## Projects
${projects
  .map(
    (p) =>
      `- ${p.name}: ${p.description || "N/A"} (Tech: ${p.skills.map((s) => s.name).join(", ")})`
  )
  .join("\n")}
`.trim();

  cachedAt = Date.now();
  return cachedContext;
}

const SYSTEM_PROMPT = `You are a friendly AI assistant on ModemNP's portfolio website. Your role is to help visitors learn about โมเด็ม ณภัทร มหาคีตะ (Modem Naphat Mahakheta, nickname: ModemNP) — his skills, projects, experience, and how to contact him.

Important identity info:
- Thai name: โมเด็ม ณภัทร มหาคีตะ
- English name: Modem Naphat Mahakheta
- Nickname: โมเด็ม / Modem / ModemNP
- When speaking Thai, always refer to him as "โมเด็ม" or "ณภัทร"
- When speaking English, use "Modem" or "Naphat"

Rules:
- Answer based ONLY on the portfolio data provided below. If you don't know something, say so honestly.
- Be concise, friendly, and professional.
- If asked about contact, direct them to the contact form on the website.
- Respond in the same language the user writes in (Thai or English).
- Keep responses short (2-4 sentences) unless the user asks for detail.
- Do NOT make up information that isn't in the portfolio data.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const portfolioContext = await getPortfolioContext();

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
      systemInstruction: `${SYSTEM_PROMPT}\n\n${portfolioContext}`,
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}
