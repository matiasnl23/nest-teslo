import * as Joi from 'joi';

export const EnvironmentValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
