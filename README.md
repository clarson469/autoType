# Auto-Type v0.1.0

## What is it?
A React component that simulates the typing of a string.

## How does it work?
Copy the "\autotype" folder into your React project, and import `AutoType`. Give it a list of strings you want it to type, away you go.  
_N.B._ you will need to separately install [fariaJS](https://github.com/clarson469/fariaJS) into your projects "\node_modules" folder, because the library has not been published to [npm](https://www.npmjs.com) yet. To do that, download and extract fariaJS, then `cd` into your project directory, and use the command `npm install \path\to\fariaJS`  
The code is heavily commented, so take a look at that to see how everything works - proper explanation / documentation (do you need documentation for a component?) will happen in a bit.  
You can customise it in various ways:
 * Styling individual blocks of text
 * Change the speed, or jittery-ness of the typing animation
 * Make it overwrite itself, leave a trail of previously typed strings in its wake
 * Skip the animation at any point
