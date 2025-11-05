import { CreateProductDto } from "./create-product.dto";
import { PartialType } from "@nestjs/mapped-types"; // install dependency

export class UpdateProductDto extends PartialType(CreateProductDto) {}
