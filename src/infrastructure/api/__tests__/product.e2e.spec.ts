import { app, sequelize } from "../express";
import request from "supertest";

const listCreate = [
  {
    type: "a",
    name: "Product A",
    price: 123.34,
  },
  {
    type: "b",
    name: "Product B",
    price: 234.33,
  }
]


describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 123.34,
      });
      
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(123.34);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product C",
    });
    expect(response.status).toBe(500);
  });


  it("should list all product", async () => {

    const [product1, product2] = listCreate;

    const response = await request(app)
      .post("/product")
      .send(product1);
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send(product2);
    expect(response2.status).toBe(200);


    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);

    expect(listResponse.body.products.length).toBe(2);

    const [resProduct1, resProduct2] = listResponse.body.products;
    expect(resProduct1.name).toBe(product1.name);
    expect(resProduct1.price).toBe(product1.price);

    expect(resProduct2.name).toBe(product2.name);
    expect(resProduct2.price).toBe(product2.price * 2);

  });

  });