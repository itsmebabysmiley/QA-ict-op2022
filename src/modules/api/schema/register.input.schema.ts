import Joi from 'joi'

export const registerSchema = Joi.object({
  language: Joi.string().required(),
  regType: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  // dob: Joi.date().required(),
  policyAgreement: Joi.allow(true).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\+66|0)([689]{1})(\d{1,8})$/)
    .required(),
  province: Joi.number().required(),
  school: Joi.alternatives().conditional('regType', [
    {
      is: 'student',
      then: Joi.string().required(),
    },
    {
      is: 'uni_student',
      then: Joi.string().required(),
    },
    {
      is: 'teacher',
      then: Joi.string().required(),
    },
  ]),
  educationLevel: Joi.alternatives().conditional('regType', [
    {
      is: 'student',
      then: Joi.number().required(),
    },
    {
      is: 'uni_student',
      then: Joi.number().required(),
    },
    {
      is: 'teacher',
      then: Joi.number().required(),
    },
  ]),
})
