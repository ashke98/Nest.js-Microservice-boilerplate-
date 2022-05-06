import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IdentityService } from '../identity.service';
import { UserAlreadyExistsException } from '../exceptions/userAlreadyExists.exception';

@Injectable()
export class ExistsStrategy extends PassportStrategy(Strategy, 'exists') {

    constructor(private readonly identityService: IdentityService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {

        console.log(username);

        const user = await this.identityService.getUserbyUsername(username);

        if(user || user !== null) {
            throw new UserAlreadyExistsException();
        }

        return {
            username: username,
            password: password
        };
    }

}