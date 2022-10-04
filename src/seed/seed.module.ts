import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from './../auth/auth.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule
  ],
})
export class SeedModule {}
