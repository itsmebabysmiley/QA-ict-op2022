import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import RegistrantTypeButton from './RegistrantTypeButton'

export default {
  title: 'OP2022/Register/RegistrantTypeButton',
  component: RegistrantTypeButton,
  argTypes: {
    label: {
      control: 'text',
      description: 'Type of registrant',
    },
    icon: {
      control: 'text',
      description: 'Icon path or url',
    },
    variant: {
      control: 'select',
      description: 'Variant of button',
    },
  },
} as Meta<typeof RegistrantTypeButton>

const Template: ComponentStoryFn<typeof RegistrantTypeButton> = (args) => (
  <RegistrantTypeButton {...args} />
)

export const Student = Template.bind({})
Student.args = {
  label: 'Student',
  icon: 'static/images/types/type-icon-student.svg',
  variant: 'primary',
}

export const UniversityStudent = Template.bind({})
UniversityStudent.args = {
  label: 'University Student',
  icon: 'static/images/types/type-icon-college-student.svg',
  variant: 'secondary',
}

export const Teacher = Template.bind({})
Teacher.args = {
  label: 'Teacher',
  icon: 'static/images/types/type-icon-teacher.svg',
  variant: 'primary',
}

export const Parents = Template.bind({})
Parents.args = {
  label: 'Parents',
  icon: 'static/images/types/type-icon-parents.svg',
  variant: 'secondary',
}

export const MuStaff = Template.bind({})
MuStaff.args = {
  label: 'MU Staff',
  icon: 'static/images/types/type-icon-mu-staff.svg',
  variant: 'primary',
}

export const Others = Template.bind({})
Others.args = {
  label: 'MU Staff',
  icon: 'static/images/types/type-icon-external.svg',
  variant: 'secondary',
}
