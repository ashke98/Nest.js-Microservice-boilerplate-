import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

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
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule { }
