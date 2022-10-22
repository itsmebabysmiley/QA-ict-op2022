import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import Header from './Header'

export default {
  title: 'OP2022/Activity/Header',
  component: Header,
} as Meta<typeof Header>

const Template: ComponentStoryFn<typeof Header> = (args) => <Header {...args} />

export const Primary = Template.bind({})
Primary.args = {}
