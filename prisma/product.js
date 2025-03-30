import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb"; // Required for MongoDB ID handling

const prisma = new PrismaClient();

// ✅ Create Product
export const createProduct = async ({ image, title, price, category }) => {
    try {
        if (!image || !title || !price || !category) {
            throw new Error("All fields (image, title, price, category) are required");
        }

        const product = await prisma.product.create({
            data: { image, title, price, category },
        });

        return product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(error.message || "Failed to create product");
    }
};

// ✅ Get All Products
export const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};

// ✅ Delete Product (Convert `id` to ObjectId for MongoDB)
export const deleteProduct = async (id) => {
    try {
        if (!id) throw new Error("Product ID is required");

        const objectId = new ObjectId(id);

        await prisma.product.delete({
            where: { id: objectId.toString() }, // Ensure id is a string
        });

        return { message: "Product deleted successfully" };
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product");
    }
};
