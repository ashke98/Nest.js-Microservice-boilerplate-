import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RolesGuard } from './guards/roles.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'account_service_queue',
        }
      }
    ]),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: RolesGuard
  }, {
      provide: 'APP_INTERTCEPTOR',
      useClass: ErrorInterceptor
    }],
})
export class AppModule { }
// this.client = ClientProxyFactory.create({
//   transport: Transport.RMQ,
//   options: {
//       urls: ['amqp://localhost:5672'],
//       queue: 'account_service_queue',
//   }
// });