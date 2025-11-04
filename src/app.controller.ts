import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { AppService, AppService2 } from './app.service';

@Controller() // goes to path localhost:3000/products
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// @Controller() // path localhost:3000
// export class AppController2 { 
//   constructor(private readonly appService: AppService2) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }