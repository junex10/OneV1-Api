import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuth, Constants } from 'src/utils';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auth = context.getArgs()[0]?.headers?.authorization;
    if (auth !== '' && auth !== undefined) {
      let jwt;
      try {
        jwt = JWTAuth.readToken(auth)?.permissions;
      } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
          console.log(err.name, ' GETTING TOKEN DO');
          throw new HttpException(
            { app_session_expired: true },
            HttpStatus.NO_CONTENT,
          );
        }
        throw new ForbiddenException('Invalid token');
      }
      const requiredCodes = [
        Constants.MODULES.FRIENDS,
        Constants.MODULES.CHAT,
        Constants.MODULES.EVENTS,
        Constants.MODULES.PROFILE,
      ];
      const hasAll = requiredCodes.every((code) =>
        jwt.some(
          (x) =>
            x.actions.main === Constants.ACTIONS.MAIN &&
            x.actions.code === code,
        ),
      );
      if (!hasAll) {
        throw new ForbiddenException(
          'Access denied, there is not enough permissions to this action',
        );
      }
    } else {
      throw new ForbiddenException(
        'Access denied, there is not enough permissions to this action',
      );
    }
    return next.handle();
  }
}
