# Coding Challenge

A signup form for a coding challenge.

## Project Setup

```
npm install
```

```
npm run serve
```

## Bonus Functionality

In addition to the mandatory functionality, I completed the following bonus optional aspects:

1. **Accessibility** - I made sure that basic accessibility worked, and while I didn't check with a screen-reader I did check the colors to make sure that they were AA compliant and used basic accessibility guidelines like semantic HTML, and using aria features where neccessary. There is some unusual handling of native form behavior, and since I did not have a chance to test with a screen reader I'm a bit concerned that it may cause some issues.
2. **Design/Styling** - Although the form is minimalistic by it's nature, I spent sometime making it more visually appealing including styling inputs and buttons, and font selection.
3. **Design/Interaction** - Added a number of animations to the app in order to make the experience a little more interesting. These include the button tray animating when moving past the first stage, and the way the stages of the form slide across to transition from one to the other. I also made a loader spinner, and added a delay to the initial load to show that animation off.
4. **Full wizard** - I implemented a dynamic form generator, and pretended it was a package. Those files are located in the `@dynamic-form` folder. Since the goal was to simulate writing an NPM package, that folder has its own readme with instructions on how to use.

I will be more than happy to field any design questions that you have.

## Misc Notes

1. I did not have time to write unit tests unfortunately, which was something that I had initially intended to do as well. It turns out that writing a wizard was a bit more time consuming that I thought it might be initially 😅
2. During cross-browser testing I noticed some minor discrepancies in IE11 and Safari, however the form still looks decent and functions properly and I had run out of time.
3. For the wizard aspect, I initially started going down a class oriented approach. My thought process is that the classes would make it easier to interact with as an API. However I ended up not using Vuex (the Redux equivelant in Vue) because I realized part way through I'd need to refactor a bit to add it. I just wanted to call this out because it's unideal that this app does not use a store.

Thanks!
