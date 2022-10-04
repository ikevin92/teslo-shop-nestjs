import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';


export class PaginationDto {

  @ApiProperty({
    default: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsPositive()
  // transformar
  @Type(() => Number) // enableImplicitConversion: true
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip'
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}