import Joi from "joi";

export const TeleUserMessage = Joi.object({
  customKeyword: Joi.string().optional(),
  url: Joi.string().uri().required(),
});
