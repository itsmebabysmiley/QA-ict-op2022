import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import InputLabel from './InputLabel'

export default {
  title: 'OP2022/Input/InputLabel',
  component: InputLabel,
} as Meta<typeof InputLabel>

const Template: ComponentStoryFn<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Label',
  required: true,
}
