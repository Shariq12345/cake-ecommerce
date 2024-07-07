import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import db from "@/lib/db";

type Props = {
  children: React.ReactNode;
};

const SetupLayout = async ({ children }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
