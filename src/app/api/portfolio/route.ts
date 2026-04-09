import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [profile, skills, techSkills, tools, projects] = await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.skill.findMany({ orderBy: { id: "asc" } }),
      prisma.technicalSkill.findMany({ orderBy: { id: "asc" } }),
      prisma.tool.findMany({ orderBy: { id: "asc" } }),
      prisma.project.findMany({
        orderBy: { id: "desc" },
        include: {
          skills: {
            select: { id: true, name: true, iconUrl: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      profile,
      skills,
      techSkills,
      tools,
      projects,
    });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
