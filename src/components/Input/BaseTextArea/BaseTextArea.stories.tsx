import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import BaseTextArea from './BaseTextArea'

export default {
  title: 'OP2022/Input/BaseTextArea',
  component: BaseTextArea,
} as Meta<typeof BaseTextArea>

const Template: ComponentStoryFn<typeof BaseTextArea> = (args) => (
  <BaseTextArea {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Placeholder',
}
