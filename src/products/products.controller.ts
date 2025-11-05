import { Controller, Post, Body, Get, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

//PUT for replacing a product
// Patch for updating

@Controller('products')
export class ProductsController { 
    // the readonly means you'll never change this instance it'll always remain ProductsService
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    addProduct(
        // @Body('title') prodTitle: string, 
        // @Body('description') prodDesc: string, 
        // @Body('price') prodPrice: number,

        //using dtos
        @Body(ValidationPipe) product: CreateProductDto

        // or @Body('completebody') { title: string, description: string, price: number}
      ) { // any is the return type for function
        

        // const generatedId = this.productsService.createProduct(
        //     prodTitle, prodDesc, prodPrice);
        // now using dto we just need to send the product
        const generatedId = this.productsService.createProduct(product);
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

    @Patch(':id')
    updateProduct(
      @Param('id') prodId: string,  // instead of taking id as string, use string and parse as int using ParseIntPipe
    //   @Body('title') prodTitle: string, 
    //   @Body('description') prodDesc: string, 
    //   @Body('price') prodPrice: number
      @Body(ValidationPipe) product: UpdateProductDto
    ){

//        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        this.productsService.updateProduct(prodId, product);
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: String){
        this.productsService.deleteProduct(prodId);
        return null;
    }

}