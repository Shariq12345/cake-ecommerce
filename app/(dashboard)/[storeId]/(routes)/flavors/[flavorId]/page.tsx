import React from "react";
import db from "@/lib/db";
import FlavorForm from "./components/flavor-form";

type Props = {
  params: {
    flavorId: string;
  };
};

const FlavorPage = async ({ params }: Props) => {
  const flavor = await db.flavor.findUnique({
    where: {
      id: params.flavorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <FlavorForm initialData={flavor} />
      </div>
    </div>
  );
};

export default FlavorPage;
