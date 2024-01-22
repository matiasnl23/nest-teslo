import * as Joi from 'joi';

export const EnvironmentValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().integer().default(5432),
});
