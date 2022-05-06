import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey_YouCANWritewateverulikeheesecretKey_YouCANWritewateverulikehee',
        });
    }

    async validate(payload: any): Promise<any> {

        console.log('payload: ', payload); // payload is decrypted data from jwt

        return payload;
    }

}