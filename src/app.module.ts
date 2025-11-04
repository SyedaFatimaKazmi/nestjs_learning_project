import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module'; // typescript feature

@Module({
  imports: [ProductsModule], // new products module // nest js feature
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
