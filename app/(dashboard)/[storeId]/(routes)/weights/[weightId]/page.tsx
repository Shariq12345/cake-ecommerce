import React from "react";
import db from "@/lib/db";
import WeightForm from "./components/weight-form";

type Props = {
  params: {
    weightId: string;
  };
};

const WeightPage = async ({ params }: Props) => {
  const weight = await db.weight.findUnique({
    where: {
      id: params.weightId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <WeightForm initialData={weight} />
      </div>
    </div>
  );
};

export default WeightPage;
