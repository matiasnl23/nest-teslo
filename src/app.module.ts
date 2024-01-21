import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentValidationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvironmentValidationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
