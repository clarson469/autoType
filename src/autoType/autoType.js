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

import React, { Component } from 'react';
// faria is not currently published at https://npmjs.com
// to use it, download the github repo from https://github.com/clarson469/fariaJS
// and use `npm install \path\to\faria`
import faria from 'faria';
import Display from './display';
import './autoType.css';

/*
**  AutoType currently makes use of the following props:
**    "textIn"      --- the text you want the component to type
**                      this can be either one single string,
**                      or an array of strings
**    "settings"    --- an associative array containing to values that
**                      determine how AutoType types. They are:
**                      "speed"   - (DEFAULT: ~ 100) the speed of the typing animation
**                      "jitter"  - (DEAFULT: ~ 0.3) the rate of erraticness that
**                                  the component types at, used to "humanise"
**                                  the animation see `AutoType.animateText()`
**                                  for this in use
**    "keepText"    --- a boolean, that determines whether the component will
**                      overwrite previous strings in the "textIn" array, or
**                      create a separate child component for each one
**                      see `AutoType.constructDisplays()` for this in use
*/

class AutoType extends Component {
  constructor ( props ) {
    super();
    this.state = {
      allTexts: [],
      text: {
        current: "",
        remaining: ""
      },
      textIndex: 0,
      runAnimation: false
    };
    this.props = props;
  }
/*
**    the following two functions (`AutoType.componentWillMount()`
**    `AutoType.componentWillUnmount()`) are placeholders to illustrate a way
**    of getting the component to skip text animation when a specified event fires
*/
  componentWillMount() {
    document.addEventListener('keypress', (event) => this.stopAnimation(event), false);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', (event) => this.stopAnimation(event), false);
  }
  componentDidMount() {
    this.prepareTexts()
  }
/*
**    this is an important part of the component's functionality leveraging
**    the React Component lifecycle to create a "tick" of sorts for the animation
*/
  componentDidUpdate() {
    if (this.state.runAnimation) this.animateText();
    else this.shiftText();
  }
/*
**    this is the function to call to respond to whatever event you want
**    to signal the component to skip the animation
*/
  stopAnimation ( event ) {
    if (event.key !== 'Enter' || !this.state.runAnimation) return;

    this.setState({runAnimation: false});
  }
/*
**    this function is called at the beginning of the animation lifecycle,
**    initialising the "textIn" props. If you plan on re-using the component
**    (i.e. passing more than one array to it without unmounting), you should
**    point `componentWillReceiveProps()` here
*/
  prepareTexts() {
    let allTexts;
    if (typeof this.props.textIn === 'string') allTexts = [this.props.textIn];
    else allTexts = this.props.textIn;

    const textIndex = 0,
          text = { current: "", remaining: allTexts[textIndex] },
          runAnimation = true;

    this.setState({
      allTexts: allTexts,
      text: text,
      textIndex: textIndex,
      runAnimation: runAnimation
    });
  }
/*
**    used to move to the next string in the "textIn" props array
*/
  shiftText() {
    const textIndex = this.state.textIndex + 1;
    if (textIndex >= this.state.allTexts.length) {
      //this.props.requestNewTexts();
      /*  NOTE --- use a props function like the above to signal that the
      **  component has cycled through the given strings in `this.props.textIn` */
      return;
    }

    const text = { current: "", remaining: this.state.allTexts[textIndex] },
          runAnimation = true;

    this.setState({
      text: text,
      textIndex: textIndex,
      runAnimation: runAnimation
    });
  }
/*
**    the timeout callback function
**    the "if" line at the top of the function is there to abort the function
**    if "runAnimation" has been changed before the timeout fires
**    (this is the only way, so far, that I've found can cancel the timeout
**    the usual clearTimeout() method doesn't seem to function properly in React
**    -- either that or I've done something wrong)
*/
  updateText() {
    if (!this.state.runAnimation) return;

    const text = faria.data.cloneObject(this.state.text);
    text.current += text.remaining.slice(0,1);
    text.remaining = text.remaining.slice(1);

    // make sure we stop the animation once we have reached the end of the string
    const runAnimation = text.remaining.length >= 1;

    this.setState({text: text, runAnimation: runAnimation});
  }
/*
**    sets the timeout for the animation
**    you can see the "settings" props at work here
**    "settings.speed" can be positive or negative
**    the higher it is, the faster the animation will be (default should be 100)
**    "settings.jitter" is how erratically each character is typed
**    the lower it is, the more erratic it will be - note that it shouldn't
**    ever be greater than 1 or less than 0
*/
  animateText() {
    const settings = this.props.settings,
          time = Math.round(
            Math.random() * (settings.speed - settings.speed * settings.jitter)
          );

    // `setTimeout` isn't assigned to a variable because doing so doesn't seem to
    // have any effect --- React doesn't respond properly to calling clearTimeout()
    setTimeout( () => this.updateText(), time );
  }
/*
**    used to create the presentational `Display` component that, uh, displays
**    the animation. Based on the value of the "keepText" props, this function
**    returns either one component, or an array of components that grows as
**    `AutoType` works its way through the "textIn" props array
**    NOTE ---- see the comments in the 'display.js' file for information on
**              the props that the `Display` component receives, and how you
**              can use them to indivdually style the strings
*/
  constructDisplays() {
    const activeText = (this.state.runAnimation)
      ? this.state.text.current
      : this.state.allTexts[this.state.textIndex];

    if (!this.props.keepText) return <Display text={activeText} />;

    const prevTexts = this.state.allTexts.slice(0, this.state.textIndex).map(
      (t, i) => (<Display key={i} text={t} />)
    );

    return prevTexts.concat([
      <Display key={this.state.textIndex + 1} text={activeText} />
    ]);
  }
  render () {
    return (
      <section className='auto-type'>
        {this.constructDisplays()}
      </section>
    );
  }
}

export default AutoType;
