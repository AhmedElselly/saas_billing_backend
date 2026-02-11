import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const obj = {
      message: 'Hello World!',
    };
    return obj;
  }
}
