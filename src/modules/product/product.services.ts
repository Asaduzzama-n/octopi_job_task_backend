import { Product } from "@prisma/client";
import prisma from "../../shared/prisma";

const createProduct = async (data: Product) => {
  const createdProduct = await prisma.product.create({ data });
  if (!createProduct) {
    return "Failed to create product";
  }
  return createdProduct;
};

const getProducts = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, minPrice, maxPrice } = options;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.product.findMany({
      include: {
        user: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: "desc",
            },

      where: {
        AND: [
          {
            price: {
              gte: Number(minPrice) || 0,
              lte: Number(maxPrice) || 10000000,
            },
          },
          searchTerm
            ? {
                OR: [
                  {
                    title: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },
    });
    return result;
  });
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!result) {
    return "Failed to get the product";
  }

  return result;
};

const deleteProduct = async (id: string) => {
  const result = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  if (!result) {
    return "failed to delete product";
  }

  return result;
};

export const ProductServices = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
