import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import TextBox from './TextBox'

export default {
  title: 'OP2022/Register/TextBox',
  component: TextBox,
} as Meta<typeof TextBox>

const Template: ComponentStoryFn<typeof TextBox> = (args) => (
  <TextBox {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor. Suscipit tellus mauris a diam. Orci sagittis eu volutpat odio. Interdum velit laoreet id donec ultrices tincidunt arcu. Nulla facilisi nullam vehicula ipsum. Gravida rutrum quisque non tellus orci ac auctor augue. Odio morbi quis commodo odio. Varius vel pharetra vel turpis nunc. Montes nascetur ridiculus mus mauris vitae ultricies. Amet porttitor eget dolor morbi non arcu. Id faucibus nisl tincidunt eget nullam. Sollicitudin aliquam ultrices sagittis orci. Nam aliquam sem et tortor consequat id porta nibh venenatis. Sem et tortor consequat id porta. Nunc sed blandit libero volutpat. Nulla facilisi nullam vehicula ipsum a arcu cursus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Rhoncus aenean vel elit scelerisque mauris pellentesque. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Quis risus sed vulputate odio ut enim blandit. Tristique nulla aliquet enim tortor at auctor. Scelerisque purus semper eget duis at tellus at. Mollis aliquam ut porttitor leo a diam. Praesent semper feugiat nibh sed pulvinar proin. Egestas diam in arcu cursus euismod quis. Curabitur gravida arcu ac tortor dignissim convallis aenean. Gravida arcu ac tortor dignissim convallis aenean. Ipsum dolor sit amet consectetur adipiscing elit. Nulla pellentesque dignissim enim sit. Nunc sed velit dignissim sodales ut eu sem integer. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sem integer vitae justo eget magna fermentum. Id venenatis a condimentum vitae sapien pellentesque. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Non curabitur gravida arcu ac tortor dignissim. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Urna porttitor rhoncus dolor purus non enim. Sed euismod nisi porta lorem mollis aliquam ut. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Arcu non odio euismod lacinia at quis risus. Ante in nibh mauris cursus mattis molestie. Accumsan tortor posuere ac ut consequat semper.',
}
