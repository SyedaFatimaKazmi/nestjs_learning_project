import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
//importing dtos
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService{
    products: Product[] = []; // you cant add a string here now since it's of type PRODUCT

    //createProduct(title: string, desc: string, price: number) : string { // either send product or what ive done
    createProduct(product: CreateProductDto): string{
        const prodId = Math.random().toString();
        //const newProd = new Product(prodId, title, desc, price);
        const newProd = new Product (prodId, product.title, product.description, product.price);
        this.products.push(newProd);
        return prodId;
    }

    getProducts(){
        // return this.products; // since javascript stores references, here we're not sending 
        // copy of the object but the pointer to it
        return [...this.products]; //copy of the array, wrapping an array in an array, but using spread its now one array
    }

    getOneProduct(productId: string){
        const prod = this.products.find((product)=> product.id == productId);
        if ( !prod ) {
            throw new NotFoundException('Could not find product.'); // 404 response
        }    
        //use find product here too
        return { ...prod };
    }

    //similarly updating for dtos
    // updateProduct(productId: string, title: string, description:string, price: number){
    updateProduct(productId: string, productDTO: UpdateProductDto){
        // const product = this.findProduct(productId)[0]; // gets the first element aka product
        // const index = this.findProduct(productId)[1];
        // better way to do it, syntax supported by typescript and modern js
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(productDTO.title){
            updatedProduct.title = productDTO.title;
        }
        if(productDTO.description){
            updatedProduct.description = productDTO.description;
        }
        if(productDTO.price){
            updatedProduct.price = productDTO.price;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(id:String): [Product, number] { //tuple
        //const prod = this.products.find((product)=> product.id == id);
        // we need id in update
        const productIndex = this.products.findIndex(product => product.id == id);
        const prod = this.products[productIndex];
        if ( !prod ) {
            throw new NotFoundException('Could not find product.'); // 404 response
        }   
        return [prod, productIndex];
    }

    deleteProduct(prodId: String){
        const [_, index] = this.findProduct(prodId); //underscore means we dont need that value
        this.products.splice(index,1); //starting that index removes one product
    }
}