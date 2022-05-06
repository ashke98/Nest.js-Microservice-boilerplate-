import { Inject, Injectable } from '@nestjs/common';
import { Identity } from './interfaces/Identity';
import { Model } from 'mongoose';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class IdentityService {

    constructor(
        @Inject('IDENTITY_MODEL')
        private identityModel: Model<Identity>,
        private jwtService: JwtService
    ) { }

    hello(message) {
        return message;
    }

    async register(createIdentityDto: CreateIdentityDto) {
        const createdIdentity = new this.identityModel(createIdentityDto);

        let saveResult = await createdIdentity.save();

        console.log(saveResult);

        return saveResult;
    }

    async validateUser(loginDto: LoginDto) {
        let loginResult = await this.identityModel.findOne({
            username: loginDto.username,
            password: loginDto.password,
        });

        if(loginResult === null) {
            return null;
        }

        let jsonData = loginResult.toObject();
        let { __v, _id, ...userData } = jsonData;

        return {
            id: jsonData._id,
            ...userData
        }
    }

    async getUserbyUsername(username: string) {
        let loginResult = await this.identityModel.findOne({
            username: username
        });

        if(loginResult === null) {
            return null;
        }

        let jsonData = loginResult.toObject();
        let { __v, _id, ...userData } = jsonData;

        return {
            id: jsonData._id,
            ...userData
        }
    }

    async login(user: any) {
        console.log('login: ', user)
        let payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            roles: user.roles
        };

        var token = this.jwtService.sign(payload);
        var tokenValue: any = this.jwtService.decode(token);

        return {
            access_token: token,
            expires_in: tokenValue.exp,
        };

    }

    validateToken(jwt: string) {
        const validatedToken = this.jwtService.verify(jwt);

        return validatedToken;
    }

}
