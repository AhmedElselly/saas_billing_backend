import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const userFn = (data: keyof any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user) return null;

  return data ? user[data] : user;
};

export const CurrentUser = createParamDecorator(userFn);
