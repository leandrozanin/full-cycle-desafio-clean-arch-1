import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should find a product", async () => {
      const productRepository = new ProductRepository();
      const usecase = new FindProductUseCase(productRepository);
  
      const customer = new Product("123", "Product A", 123.45);
  
      await productRepository.create(customer);
  
      const input = {
        id: "123",
      };
  
      const output = {
        id: "123",
        name: "Product A",
        price: 123.45
      };
  
      const result = await usecase.execute(input);
  
      expect(result).toEqual(output);
    });
  });