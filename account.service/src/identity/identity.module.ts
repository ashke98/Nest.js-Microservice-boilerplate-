import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { databaseProviders } from './database/database.providers';
import { identityProviders } from './database/identity.providers';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ExistsStrategy } from './strategies/exists.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey_YouCANWritewateverulikeheesecretKey_YouCANWritewateverulikehee',
      signOptions: { expiresIn: '10000s' },
    })
  ],
  controllers: [IdentityController],
  providers: [IdentityService, ...identityProviders, ...databaseProviders, LocalStrategy, JwtStrategy, ExistsStrategy],
  exports: [...databaseProviders],
})
export class IdentityModule { }
