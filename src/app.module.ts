import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module'; // typescript feature
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so you can use process.env anywhere
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    ProductsModule,
  ], // new products module // nest js feature
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
