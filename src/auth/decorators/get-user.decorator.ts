import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(`🚀 ~ file: get-user.decorator.ts ~ line 6 ~ data`, data);
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new InternalServerErrorException('User not found (request)');
    }

    return (!data) ? user : user[data];
  }
);