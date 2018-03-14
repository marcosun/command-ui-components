

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
|type|String \|\| [Number]|solid|Accept string solid or an array of numbers representing dashed lines. i.e. [20, 2]|
|size|Number|0|Size of the conatiner|
|from|Number|0|Progress value starts from|
|to|Number|1|Progress value ends to|
|width|Number|2|Arc line width|
|lineCap|String|butt|One of butt, round, square|
|color|String \|\| Object|black|Progress color, for gradient colors, pass in an object of colour stops and corresponding colour names. Minimum three colour stops for gradient. i.e. {0: 'red', 0.5: 'green', 1: 'blue'}|
|backgroundColor|String|transparent|Background colour|
|animateDuration|Number|0|Animate duration in milliseconds|

### 2. OdometerBoard

#### Config Options
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|classes|Object| |Useful to extend the style applied to components|
|data|Array|[{name: '行驶总里程（公里）',value: 485512,},...]|Name and value of every board|
|data.name|String|行驶总里程（公里）|Name of every board|
|data.value|Number|485512|Value of every board|

#### CSS API
You can override all the class names injected by Command-UI-Components thanks to the classes property. This property accepts the following keys:
- root
- container
- name
- value

### 3. ButtonGroup

|Name|Type|Default|Required|Description
|:--:|:--:|:-----:|:------:|:----------|
|isMultiple|Boolean|false|N|Support multiple select|
|buttons|Array||Y|An array of buttons|
|buttons.name|String||Y|Button name|
|buttons.id|String||N|Button id. Equal to name if omitted. Locally unique|
|buttons.isActive|Boolean|false|N|Should button selected|
|buttonAll|Object|{}|N|Button 'select all'. If configured to true, it opens multiple select feature, even though isMultiple is configured to false|
|buttonAll.name|String||Y|Button name|
|buttonAll.id|String||N|Button id. Equal to name if omitted. Locally unique|
|buttonAll.isActive|Boolean|false|N|Should button selected|
|onClick|Function||N|Accept two arguments: clicked button object and all selected button list|

### 4. AppBar

|Name|Type|Default|Required|Description
|:--:|:--:|:-----:|:------:|:----------|
|classes|Object||N|Css overwrite|
|classes.menuList|string||N|Overwrite MenuList styles|
|caption|Object||Y|AppBar caption|
|position|String|relative|N|relative: Document flow AppBar component. absolute: AppBar is absolute positioned|
|city|String||N|City name|
|navs|Array||N|Navigation buttons|
|navs.name|String||Y|Navigation button name|
|navs.id|String|navs.name|N|Navigation button id, default equal to button name|
|navs.isActive|Boolean|false|N|Whether button is highlighted|
|navs.navs|Array||N|Sub navigation button list|
|onClick|Function||N|Gives a list of arguments. The last argument is the actual navigation button that has been clicked, the previous represents the parent navigation button and so on|

### 5.Table

|Name|Type|Default|Required|Description|
|:--:|:--:|:-----:|:------:|:------:|
|classes|Object| |N|Useful to extend the style applied to components|
|columns|Array|[]|Y|Column value|
|columns.label|String/React dom||Y|Display|
|columns.prop|String||Y|Correspond to key of data|
|data|Array|[]|Y|Every cloumns.prop value|
|isPaginate|Boolean|false|Y|true: Scroll table. false: Paginate table|
|rowsPerPage|Number|5|Y|Row number every page|
|selectRowIndex|Number||N|The row of index. If you want to add click style or hover style, you can config this prop and also need to config onRowClick|
|onRowClick|Function||N|Accept two arguments: clicked row data and clicked row index|

### 6.Lessen

|Name|Type|Default|Required|Description|
|:--:|:--:|:-----:|:------:|:------:|
|classes|Object| |N|Useful to extend the style applied to components|
|children|Node||N|The content of the component|
|data|Array||Y|Every lessen data|
|data.name|String||Y|Tab name|
|data.id|String||Y|Unique id|
|data.classes|String||N|Css api. Useful to override leseen style|
|data.isShowLessen|Boolean||N|Initial lessen display|
|takeSpace|Boolean|true|Y|Whether tabs take up space in dom|
