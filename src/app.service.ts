import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Products!';
  }
}

// @Injectable()
// export class AppService2 {
//   getHello(): string {
//     return 'Hello Home';
//   }

// }
