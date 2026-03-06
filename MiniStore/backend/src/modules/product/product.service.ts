import axios from "axios";

export class ProductService {
  async fetchAllProducts(searchTerm?: string): Promise<any[]> {
    let response;

    response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm || ""}`);
    return response.data.products;
  }

  async fetchProductById(id: string | number): Promise<any> {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }

  async fetchProductsByIds(productIds: number[]) {
    return Promise.all(
      productIds.map(async (productId) => {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${productId}`);
          return {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            price: response.data.price,
            thumbnail: response.data.thumbnail,
          };
        } catch (error) {
          console.error(`Failed to fetch product ${productId}:`, error);
          return { id: productId, title: "Product not found", price: 0 };
        }
      })
    );
  }
}
