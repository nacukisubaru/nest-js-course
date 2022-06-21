import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private unautorizedMessage: string = 'Пользователь не авторизован';

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //служит для получения контекста текущего выполненного запроса
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                this.UnauthorizedError(this.unautorizedMessage);
            }

            const user = this.jwtService.verify(token);            
            req.user = user;
            return true;
        } catch (e) {
            this.UnauthorizedError(this.unautorizedMessage);
        }
    }

    private UnauthorizedError(message): void {
        throw new UnauthorizedException({message});
    }
}