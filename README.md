# react-color-picker-wheel


[![npm version](https://badge.fury.io/js/react-color-picker-wheel.svg)](https://badge.fury.io/js/react-color-picker-wheel)

**Color picker component for React.js using color wheel**

<img src="https://github.com/ahmethalac/react-color-picker-wheel/blob/master/media/example.gif" width="300" height="300"/>

Demo can be found here: https://ahmethalac.github.io/react-color-picker-wheel/

## Installation

> npm install react-color-picker-wheel  
>yarn add react-color-picker-wheel

## Usage

```javascript
import ColorPicker from 'react-color-picker-wheel';
// ...
return <ColorPicker
    initialColor="#FF0000"
    onChange={(color => console.log(color))}
    //Console output => { hex: "#FF0000", rgb : { r: 255, g: 0, b: 0 } , hsl : { h: 0, s: 100, l: 50 }
    size={300}
/>;
```

## Properties

| Name | Type | Default Value | Description
| ---- | ---- | ------------- | -----------
| initialColor | ```Hex``` | ```"#FF0000"``` | Color to render onto color wheel. It can be hex(#ffffff) or rgb object ({r:0, g:0, b:0})
| onChange | ```func``` | ```()=>{}``` | Function which will be called when color change occurs. Function parameter is a color object
| size | ```number``` | ```100``` | Size of the container in pixels (Container is a square)
