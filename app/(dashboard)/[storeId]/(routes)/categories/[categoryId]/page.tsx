import React from "react";
import db from "@/lib/db";
import CategoryForm from "./components/category-form";

type Props = {
  params: {
    categoryId: string;
    storeId: string;
  };
};

const CategoryPage = async ({ params }: Props) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
