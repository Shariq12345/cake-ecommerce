import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  // REQUEST IS NOT REQUIRED BUT WE CANNOT ONLY USE THE PARAMS
  req: Request,
  { params }: { params: { weightId: string } }
) {
  try {
    if (!params.weightId) {
      return new NextResponse("Weight ID is required", { status: 400 });
    }

    const weight = await db.weight.findUnique({
      where: {
        id: params.weightId,
      },
    });

    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; weightId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.weightId) {
      return new NextResponse("Weight Id is required", { status: 400 });
    }

    // IF USER IS ACCESSING SOMEONELSE BILLBOARD
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const weight = await db.weight.updateMany({
      where: {
        id: params.weightId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  // REQUEST IS NOT BUT WE CANNOT ONLY USE THE PARAMS
  req: Request,
  { params }: { params: { storeId: string; weightId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.weightId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    // IF USER IS ACCESSING SOMEONELSE BILLBOARD
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const weight = await db.weight.deleteMany({
      where: {
        id: params.weightId,
      },
    });

    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
