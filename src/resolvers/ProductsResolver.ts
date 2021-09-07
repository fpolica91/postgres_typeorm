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

@InputType()
class ProductUpdatType {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  price?: number;

  @Field(() => Number, { nullable: true })
  quantity?: number;
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

  @Mutation(() => Boolean)
  async updateProduct(
    @Arg("id") id: number,
    @Arg("productUpdatType") productUpdatType: ProductUpdatType
  ) {
    await Product.update(id, productUpdatType);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteByName(@Arg("name") name: string) {
    const product = await Product.findOne({ where: { name } });
    if (product) {
      product.remove();
    }
    return !!product;
  }

  @Query(() => [ProductReturnType])
  async getProducts() {
    const products = await Product.find();
    return products;
  }
}
