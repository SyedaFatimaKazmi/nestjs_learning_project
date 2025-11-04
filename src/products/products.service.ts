import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    products: Product[] = []; // you cant add a string here now since it's of type PRODUCT

    createProduct(title: string, desc: string, price: number) : string { // either send product or what ive done
        const prodId = Math.random().toString();
        const newProd = new Product(prodId, title, desc, price);
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
        return { ...prod };
    }
}