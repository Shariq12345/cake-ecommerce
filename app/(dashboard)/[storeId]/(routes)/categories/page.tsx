import React from "react";
import db from "@/lib/db";
import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/client";

type Props = {
  params: {
    storeId: string;
  };
};

const CategoriesPage = async ({ params }: Props) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
