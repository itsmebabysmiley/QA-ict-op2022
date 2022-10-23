import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import ChoiceInput from './ChoiceInput'

export default {
  title: 'OP2022/Activity/Input/ChoiceInput',
  component: ChoiceInput,
} as Meta<typeof ChoiceInput>

const Template: ComponentStoryFn<typeof ChoiceInput> = (args) => (
  <ChoiceInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  id: 'radio-input',
  selected: true,
  label:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos itaque dolorem aut cupiditate, repellat dicta quia aliquam ducimus. A autem sunt laborum perferendis odio suscipit fugiat optio cum vel voluptates!',
}
