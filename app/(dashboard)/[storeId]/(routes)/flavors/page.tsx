import React from "react";
import db from "@/lib/db";
import { format } from "date-fns";
import { FlavorColumn } from "./components/columns";
import FlavorClient from "./components/client";

type Props = {
  params: {
    storeId: string;
  };
};

const FlavorsPage = async ({ params }: Props) => {
  const flavors = await db.flavor.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFlavors: FlavorColumn[] = flavors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FlavorClient data={formattedFlavors} />
      </div>
    </div>
  );
};

export default FlavorsPage;
