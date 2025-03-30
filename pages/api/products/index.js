import { createProduct, deleteProduct, getAllProducts } from "@/prisma/product";

export default async function handler(req, res) {
    try {
        console.log("Request Method:", req.method);
        console.log("Request Body:", req.body);
        console.log("Request Query:", req.query);

        switch (req.method) {
            case 'POST': {
                const { image, title, price, category } = req.body;

                if (!image || !title || !price || !category) {
                    return res.status(400).json({ message: "All fields are required" });
                }

                const new_product = await createProduct({ image, title, price, category });
                return res.status(201).json(new_product);
            }

            case 'GET': {
                const products = await getAllProducts();
                return res.status(200).json(products);
            }

            case 'DELETE': {
                const { id } = req.query;

                if (!id) {
                    return res.status(400).json({ message: "Product ID is required" });
                }

                await deleteProduct(id);
                return res.status(200).json({ message: "Product deleted successfully" });
            }

            default:
                return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

// ✅ Ensure Body Parser is enabled
export const config = {
    api: { bodyParser: true },
};
