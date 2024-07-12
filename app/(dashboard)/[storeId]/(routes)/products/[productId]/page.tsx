import React from "react";
import db from "@/lib/db";
import ProductForm from "./components/product-form";

type Props = {
  params: {
    productId: string;
    storeId: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const weights = await db.weight.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const flavors = await db.flavor.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <ProductForm
          initialData={product}
          categories={categories}
          weights={weights}
          flavors={flavors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
