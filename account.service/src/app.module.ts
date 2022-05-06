import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [IdentityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
