import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import TextInput from './TextInput'

export default {
  title: 'OP2022/Input/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>

const Template: ComponentStoryFn<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  required: true,
  placeholder: 'Placeholder',
}
