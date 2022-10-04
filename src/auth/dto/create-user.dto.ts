import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';


export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    nullable: false,
    minLength: 1,
    maxLength: 255,
    format: 'email',
    example: 'usuario@mail.com'
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    minLength: 6,
    maxLength: 50,
    example: '12345678'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({
    description: 'User name',
    nullable: false,
    minLength: 1,
    maxLength: 6,
    example: 'John Doe'
  })
  @IsString()
  @MinLength(6)
  fullName: string;
}