import Joi from 'joi'

export const registerSchema = Joi.object({
  language: Joi.string().required(),
  regType: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  province: Joi.number().required(),
  school: Joi.alternatives()
    .conditional('regType', {
      is: 'uni_student',
      then: Joi.string().required(),
    })
    .conditional('regType', {
      is: 'student',
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  educationLevel: Joi.alternatives()
    .conditional('regType', {
      is: 'uni_student',
      then: Joi.number().required(),
    })
    .conditional('regType', {
      is: 'student',
      then: Joi.number().required(),
    })
    .conditional('regType', {
      is: 'teacher',
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
})
