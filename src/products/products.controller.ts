import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController { 
    // the readonly means you'll never change this instance it'll always remain ProductsService
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        // or @Body('completebody') { title: string, description: string, price: number}
      ) { // any is the return type for function
        const generatedId = this.productsService.createProduct(
            prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    //if there are two gets without a param, the first one always executes, in this case it'll be the top one
    @Get(':id') //dynamic path
    getProduct(@Param('id') prodId: string){
        return this.productsService.getOneProduct(prodId);
    }
}