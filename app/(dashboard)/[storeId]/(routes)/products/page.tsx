import React from "react";
import db from "@/lib/db";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
import ProductClient from "./components/client";

type Props = {
  params: {
    storeId: string;
  };
};

const ProductsPage = async ({ params }: Props) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      weight: true,
      flavor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    weight: item.weight.name,
    flavor: item.flavor.name,
    createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
