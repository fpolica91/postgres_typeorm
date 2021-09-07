import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Product as ProductReturnType } from "../entity/Product";
import { Product } from "../models/product";

@InputType()
class ProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;
}

@Resolver()
export class ProductsResolver {
  @Mutation(() => ProductReturnType)
  async createProduct(@Arg("productInput") productInput: ProductInput) {
    const product = Product.create(productInput);
    await product.save();
    return product;
  }

  @Mutation(() => Boolean)
  deleteProduct(@Arg("id") id: number) {
    Product.delete(id);
    return true;
  }

  @Query(() => [ProductReturnType])
  async getProducts() {
    const products = await Product.find();
    return products;
  }
}
