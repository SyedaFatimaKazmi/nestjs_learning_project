import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../database/product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) 
    private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(title: string, desc: string, price: number): Promise<string> {
    const newProduct = new this.productModel({ title, description: desc, price });
    const result = await newProduct.save();
    return result._id.toString();
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  async getOneProduct(productId: string) {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updated = await this.productModel.findById(productId).exec();

    if (!updated) {
      throw new NotFoundException('Could not find product.');
    }

    if (title) updated.title = title;
    if (desc) updated.description = desc;
    if (price) updated.price = price;

    await updated.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
}
