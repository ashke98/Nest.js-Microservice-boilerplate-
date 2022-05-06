import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IdentityService } from './identity.service';
import { ExistsAuthGuard } from './strategies/exists-auth.guard';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('identity')
export class IdentityController {

    constructor(private identityService: IdentityService) { }


    @MessagePattern('helloFromApi')
    hello(req) {
        return this.identityService.hello(req);
    }

    @UseGuards(ExistsAuthGuard)
    @MessagePattern('register')
    async register(command) {
        return this.identityService.register(command.body);
    }

    @UseGuards(LocalAuthGuard)
    @MessagePattern('login')
    async login(command) {
        console.log('command user: ', command.user);

        return this.identityService.login({
            ...command.user,
            roles: ['admin']
        });
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;

        return rest;
    }

    @MessagePattern('isAuthenticated')
    async isAuthenticated(command) {
        try {
            const res = this.identityService.validateToken(command.jwt);

            return res;
        }
        catch (err) {
            return false;
        }
    }

}