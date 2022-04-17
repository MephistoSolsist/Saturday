import Joi from "joi"

export const MemberSchema = {
  member_id: Joi.string().length(10),
  alias: Joi.string().max(10),
  password: Joi.string().max(30),
  name: Joi.string().regex(/^[\u4e00-\u9fa5]{2,4}$/),
  section: Joi.string().regex(/^([\u4e00-\u9fa5]{2,10})(\d{3})$/),
  profile: Joi.string().max(1000),
  phone: Joi.string().regex(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/),
  qq: Joi.string().regex(/[1-9][0-9]{4,14}/),
  avatar: Joi.string().max(30),
  role: Joi.number().integer().min(0).max(2),
  status: Joi.number().integer().min(0).max(1),
  created_by: Joi.string().length(10),
  gmt_create: Joi.date(),
  gmt_modified: Joi.date(),
  gmt_expire: Joi.date(),
}
