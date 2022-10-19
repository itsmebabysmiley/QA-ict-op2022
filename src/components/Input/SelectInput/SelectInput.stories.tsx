import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import SelectInput from './SelectInput'

export default {
  title: 'OP2022/Input/SelectInput',
  component: SelectInput,
} as Meta<typeof SelectInput>

const Template: ComponentStoryFn<typeof SelectInput> = (args) => (
  <SelectInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  required: true,
  options: ['Option 1', 'Option 2', 'Option 3'],
}
