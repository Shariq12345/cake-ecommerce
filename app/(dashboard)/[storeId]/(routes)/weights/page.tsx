import React from "react";
import db from "@/lib/db";
import { format } from "date-fns";
import { WeightColumn } from "./components/columns";
import WeightClient from "./components/client";

type Props = {
  params: {
    storeId: string;
  };
};

const WeightsPage = async ({ params }: Props) => {
  const weights = await db.weight.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedWeights: WeightColumn[] = weights.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WeightClient data={formattedWeights} />
      </div>
    </div>
  );
};

export default WeightsPage;
