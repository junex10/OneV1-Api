import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuth, Constants } from 'src/utils';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auth = context.getArgs()[0]?.headers?.authorization;
    if (auth !== '' && auth !== undefined) {
      console.log(auth, ' GETTING TOKEN DO');
      const jwt = JWTAuth.readToken(auth)?.permissions;
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
