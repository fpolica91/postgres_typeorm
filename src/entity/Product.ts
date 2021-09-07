import { ObjectType, Field } from "type-graphql";
@ObjectType()
class Product {
  @Field()
  name: String;

  @Field()
  price: Number;

  @Field()
  quantity: Number;
}

export { Product };
