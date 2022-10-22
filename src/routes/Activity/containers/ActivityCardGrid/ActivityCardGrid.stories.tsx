import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import ActivityCardGrid from './ActivityCardGrid'

export default {
  title: 'OP2022/Activity/ActivityCardGrid',
  component: ActivityCardGrid,
} as Meta<typeof ActivityCardGrid>

const Template: ComponentStoryFn<typeof ActivityCardGrid> = (args) => (
  <ActivityCardGrid {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  activities: [
    { icon: 'op2022:app-registration', title: 'Check in' },
    { icon: 'op2022:modern-mic', title: 'Meet & Greet' },
    { icon: 'op2022:earth', title: 'International Experiences' },
    { icon: 'op2022:chalkboard-teacher', title: 'Guidance' },
    { icon: 'op2022:text-snippet', title: 'Innovative Project' },
    { icon: 'op2022:star-half', title: 'Evaluation' },
  ],
}
