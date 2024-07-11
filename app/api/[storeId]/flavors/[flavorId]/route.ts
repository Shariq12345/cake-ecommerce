import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  // REQUEST IS NOT REQUIRED BUT WE CANNOT ONLY USE THE PARAMS
  req: Request,
  { params }: { params: { flavorId: string } }
) {
  try {
    if (!params.flavorId) {
      return new NextResponse("Flavor ID is required", { status: 400 });
    }

    const flavor = await db.flavor.findUnique({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; flavorId: string } }
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

    if (!params.flavorId) {
      return new NextResponse("Flavor Id is required", { status: 400 });
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

    const flavor = await db.flavor.updateMany({
      where: {
        id: params.flavorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  // REQUEST IS NOT BUT WE CANNOT ONLY USE THE PARAMS
  req: Request,
  { params }: { params: { storeId: string; flavorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.flavorId) {
      return new NextResponse("Flavor ID is required", { status: 400 });
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

    const flavor = await db.flavor.deleteMany({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
