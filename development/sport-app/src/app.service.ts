/**
 |===============================================================
 | Provider
 |===============================================================
 |
 | Providers are crucial for offering functionalities such as
 | database access or API calls. They ensure modular, testable
 | code by effectively handling dependencies. Each Provider must
 | be imported in its own @Module
 |
 | @ReadMore https://docs.nestjs.com/providers
 |
 |===============================================================
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return 'asdasd';
  }
}
