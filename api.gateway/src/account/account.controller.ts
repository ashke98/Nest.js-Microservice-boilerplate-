import { Controller, Request, Get, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(private accountService: AccountService) {}

    @Get('hello')
    getHello(): any {
        return this.accountService.hello();
    }

    @Post('sign-up')
    async register(@Request() req) {
        return this.accountService.register({ body: req.body });
    }

    @Post('sign-in')
    async login(@Request() req) {
        return this.accountService.login({ body: req.body });
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() req) {
        return this.accountService.me({ headers: req.headers });
    }
}
