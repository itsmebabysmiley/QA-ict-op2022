import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import TextAreaInput from './TextAreaInput'

export default {
  title: 'OP2022/Input/TextAreaInput',
  component: TextAreaInput,
} as Meta<typeof TextAreaInput>

const Template: ComponentStoryFn<typeof TextAreaInput> = (args) => (
  <TextAreaInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  required: true,
  placeholder: 'Placeholder',
}
