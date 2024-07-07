import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import db from "@/lib/db";

type Props = {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
};

const DashboardLayout = async ({ children, params }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      Navbar
      {children}
    </>
  );
};

export default DashboardLayout;
