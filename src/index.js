import React from 'react';
import ReactDOM from 'react-dom';
import AutoType from './autoType/autoType';

var props = {
  textIn: ['This is a text string', 'This is also a text string'],
  settings: { speed: 100, jitter: 0.3 },
  keepText: true
};

ReactDOM.render(
  <AutoType textIn={props.textIn} settings={props.settings} keepText={props.keepText} />,
  document.getElementById('root')
);
