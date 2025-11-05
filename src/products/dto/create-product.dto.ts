import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class CreateProductDto{
    // id: string; dont need id since we're generating it in code, not receiving it from user
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;
    
    @IsNumber()
    price: number;
}