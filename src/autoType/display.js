/*

MIT License

Copyright (c) 2017 clarson469

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


*/

import React from 'react';

/*
**  Display currently makes use of the following props:
**    "text"            --- the string to be displayed
**    "desc"            --- an optional value used to add another className to the
**                          component - use this to style multiple comonents individually
*/

function Display ( props ) {
  // ensure that _not_ setting the "desc" props does not break the component in any way
  const displayClass = props.desc !== undefined
    ? 'auto-type-text ' + props.desc
    : 'auto-type-text ';


  return <p className={displayClass}>{props.text}</p>;
}

export default Display;
