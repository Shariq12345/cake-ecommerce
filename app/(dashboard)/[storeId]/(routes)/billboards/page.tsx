import React from "react";
import db from "@/lib/db";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";

type Props = {
  params: {
    storeId: string;
  };
};

const BillboardsPage = async ({ params }: Props) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
