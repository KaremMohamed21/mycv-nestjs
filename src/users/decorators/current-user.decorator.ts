import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const { currentUser } = ctx.switchToHttp().getRequest();
    return currentUser;
  },
);
