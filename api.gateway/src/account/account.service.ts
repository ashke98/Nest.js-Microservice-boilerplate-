import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AccountService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'account_service_queue',
            }
        });
    }

    public hello() {
        return this.client.send<any, any>('helloFromApi', 'hello from api!');
    }

    public register(command) {
        return this.client.send<any, any>('register', command);
    }

    public login(command) {
        return this.client.send<any, any>('login', command);
    }

    public me(command) {
        return this.client.send<any, any>('me', command);
    }
}
