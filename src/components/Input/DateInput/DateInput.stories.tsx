import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import DateInput from './DateInput'

export default {
  title: 'OP2022/Input/DateInput',
  component: DateInput,
} as Meta<typeof DateInput>

const Template: ComponentStoryFn<typeof DateInput> = (args) => (
  <DateInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  required: true,
}
