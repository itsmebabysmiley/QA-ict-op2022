import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import ActivityCard from './ActivityCard'

export default {
  title: 'OP2022/Activity/ActivityCard',
  component: ActivityCard,
} as Meta<typeof ActivityCard>

const Template: ComponentStoryFn<typeof ActivityCard> = (args) => (
  <ActivityCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  icon: 'op2022:app-registration',
  title: 'Check in',
  success: true,
}
