import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import BaseInput from './BaseInput'

export default {
  title: 'OP2022/Input/BaseInput',
  component: BaseInput,
} as Meta<typeof BaseInput>

const Template: ComponentStoryFn<typeof BaseInput> = (args) => (
  <BaseInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Placeholder',
}
