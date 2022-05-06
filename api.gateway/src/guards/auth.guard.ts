import { CanActivate, ExecutionContext, Logger, Inject } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

export class AuthGuard implements CanActivate {
    constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const isAuthenticated = await this.client.send<boolean>('isAuthenticated',
                {
                    jwt: req.headers.authorization?.split(' ')[1] // <token> not bearer
                }
            ).pipe(timeout(5000)).toPromise();

            if(isAuthenticated && isAuthenticated !== null){
                req.user = isAuthenticated;

                return true;
            }
            else {
                return false;
            }
        } catch(err) {
            Logger.error(err);

            console.log('AuthGuard:', err);

            return false;
        }
    }
}