import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import FormHeader from './FormHeader'

export default {
  title: 'OP2022/Register/FormHeader',
  component: FormHeader,
} as Meta<typeof FormHeader>

const Template: ComponentStoryFn<typeof FormHeader> = (args) => (
  <FormHeader {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
  section: 'Section Title',
}
