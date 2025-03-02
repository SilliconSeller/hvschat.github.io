export default class ProductHandler {
    data: any;
    constructor(data) {
      this.data = data;
    }
  
    async getProducts() {
      return this.data.data.products;
    }
  
    async getGptResponse(): Promise<string | undefined> {
      try {
        const gptResponse = this.data.data.gptResponse;
        const gptResponseToUser = Object.keys(gptResponse);
        return gptResponse[gptResponseToUser[0]];
      } catch (error) {
        console.log("erro na classe", error);
      }
    }
  
    // Método para obter os produtos e a mensagem do GPT juntos
    async getProductsAndMessage() {
      const products = this.getProducts();
      const gptResponseMessageToUser = this.getGptResponse();
      return { products, gptResponseMessageToUser };
    }
}