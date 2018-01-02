Command-UI-Components consists a bunch of UI tools for visualisation on large screens. It is my personal UI component package. Due to limited testing, it is not recommended for producton use at this very early stage, however comments and discussions are welcomed.

## Installation

Command-UI-Components is available as an [npm package](https://www.npmjs.com/package/command-ui-components).

```sh
npm install --save command-ui-components
```

## API Documentation

### 1. CircularProgress

#### Config Options
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|size|Number|0|Size of the conatiner|
|from|Number|0|Progress value starts from|
|to|Number|1|Progress value ends to|
|animateDuration|Number|0|Animate duration in milliseconds|
|arc|Object|||
|arc.radius|number|0|Arc radius in pixel|
|arc.lineStyle|Object|||
|arc.lineStyle.tyle|String \|\| [Number]|solid|Accept string solid or an array of numbers representing dashed lines. i.e. [20, 2]|
|arc.lineStyle.lineCap|String|butt|One of butt, round, square|
|arc.lineStyle.width|Number|2|Arc line width|
|arc.lineStyle.color|String \|\| Object|black|Progress color, for gradient colors, pass in an object of colour stops and corresponding colour names. Minimum three colour stops for gradient. i.e. {0: 'red', 0.5: 'green', 1: 'blue'}|
|backgroundColor|String|transparent|Background colour|
|style|Object||Custom styles|