import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";
import { Field, Int } from "type-graphql";

@Entity("products")
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column({ default: 0 })
  quantity: number;
}
