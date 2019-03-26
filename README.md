Computatis
==========

This is my high school final exams project.

## Installation

```bash
# git clone of this folder
git clone https://github.com/kubajj/ComputatisDevelopmentProject.git

# go to the folder
cd Computatis

# installation of dependencies
npm install

# start development server on localhost
npm run dev
```

## Development
This application is using Vue.js, but the only knowledge needed for the development is of knowledge of javascript and HTML.

[Vue](https://vuejs.org/v2/guide/) [JS](https://www.w3schools.com/js/) [HTML](https://www.w3schools.com/html/)

Go to [Computatis Development Project](https://github.com/kubajj/ComputatisDevelopmentProject), where is functional development project for you to test your plugins and mods.

Application has many layers, but the only important one for you is the lowest one. It is in the PracContentFiles (Practice Content Files) directory, where are the individual task generators in their branch folders. You do not have to take care of anything else than about this folder.

```html
<template>
	<div>
		<heading head='Lineární rovnice'></heading>
		<b-row>
			<b-col cols='12' sm="10" md="9" lg="8" xl="8">
				<vue-mathjax :formula="task"/> <!-- this shows the task in the mathjax format -->
			</b-col>
		</b-row>
		<b-row>&nbsp</b-row>
		<b-row>
			<b-col v-if='same' cols='12' sm="10" md="9" lg="8" xl="8"/>
			<b-col v-else cols='12' sm="10" md="9" lg="7" xl="8"><!-- this shows the hint button and describes its function -->
				<span v-if='!hinted' @click='hint' class='hintstyle'>Nápovědu prosím</span>
				<span v-else><vue-mathjax :formula="hintValue"/></span>
			</b-col>
			<b-col cols="8" sm="7" md="6" lg="4" xl="3"><!-- this renders a form for the insertion of the result -->
				<b-form-input
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputForm"
		                style='margin-bottom: 5px;'>                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="4" sm="3" md="2" lg="1" xl="1"><!-- this renders a button for the submission of the result -->
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>	
		<ch-alerts :checked='checked' :result='result'></ch-alerts><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				task: '',
				usersResult: '',
				checked: '',
				result: '',
				hinted: false,
				hintValue: '',//this variable consists of number of xs = number of values
				theSame: '',//this boolean stores true if the task and hintValue are completely same
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) { //this method generates a random number in the interval that was specified in the parentheses
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			sign() { //this method simplifies the process of having numbers with negative value while not including 0
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd]; //it returns 1 or -1
			},
			variants() { //this method decide whether the number, which was generated will be number of xs or just number
				var arr = ['x', 'n'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			position() {	//b == before "=", a == after "="			
				var arr = ['b', 'a'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			resetAll() { //this method resets all variables that have been changed and will be used in the next call of genTask
				this.checked = '';
				this.usersResult = '';				
				this.task = '';
				this.result = '';
				this.hinted = false;
				this.same = false;
			},
			hint() { //shows hint
				this.hinted = true;
			},
			genTask() { //this method generates the task
				this.resetAll();
				var quantity = this.randomNumber(1, 5);
				var rationalResult = false; //the result should be only k, k/2 or k/4, so it is easier to be inserted in the result input
				while (!rationalResult) { //if the final result is not rational it renders again with different number
					var xs = this.randomNumber(1, 50)*this.sign();
					var firstx = this.controlX(xs);
					var firstnum = this.randomNumber(1, 50)*this.sign();
					var tmpstringb = '$$' + firstx + 'x'; //assigning two variables for before = and after it
					var tmpstringa = '=' + firstnum;
					var numbers = firstnum;
					for (let i = 1; i < quantity; i++) { //generates random numbers and includes them to tmp string
						var tmpnumber = this.randomNumber(1, 50)*this.sign();
						var tmpvalue = '';
						var variant = this.variants()
						if (variant == 'x') {
							var currentX = this.controlX(tmpnumber);
							if (tmpnumber < 0) {
								tmpvalue += tmpnumber + 'x';
							} else {
								tmpvalue += '+' + tmpnumber + 'x';
							}
						} else {
							if (tmpnumber < 0) {
								tmpvalue += tmpnumber;
							} else {
								tmpvalue += '+' + tmpnumber;
							}						
						}
						if (this.position() == 'b') {
							if (variant == 'x') {
								xs += tmpnumber;
							} else {
								numbers -= tmpnumber;
							}
							tmpstringb += tmpvalue;
						} else {
							if (variant == 'x') {
								xs -= tmpnumber;
							} else {
								numbers += tmpnumber;								
							}
							tmpstringa += tmpvalue;
						}
					}
					var x = (numbers / xs); //counts the ratio of the result if it is not whole number, half or a quarter, it has to be computed again
					if ((x % 1 == 0 || x % 1 == 0.5 || x % 1 == 0.25) && numbers != 0) {
						rationalResult = true;
						this.task = tmpstringb + tmpstringa + '$$'
						if (xs < 0) {
							xs = - xs;
							numbers = -numbers;
						}
						if (xs == 1) {
							xs = '';
						} 
						if (xs == -1) {
							xs = '-';
						}
						this.hintValue = '$$' + xs + 'x=' + numbers + '$$';
						if (this.task == this.hintValue) {
							this.same = true;
						}
						break;
					} else {
						continue;
					}
				}
				this.result = x;
			},
			controlX(x) { //this method handles the avoidance of having 1x and -1x, which are substituted by only x and -x
				if (x == 1) {
					return '';
				} else if (x == -1) {
					return '-';
				} 
				return x;
			},
			check() {
				if (this.checked == 'right') { //if the user result is right and user press enter 2 times, it generates next task
					this.genTask();
					return;
				}
				if (this.usersResult == this.result) { //checks if the user result (inserted to input) is right
					this.checked = 'right';
					this.same = true; //if the hint was not used and user answered correctly, the hint button hides
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
		},
		beforeMount() { //generates the task when the component loads
			this.genTask();
		},
		mounted() { //enables the usage of next method in PracContent.vue
		    bus.$on('next', this.genTask);
		},  
	}
</script>


<style>
	.result {
		margin-top: 50px;
	}
</style>
```

The example above will be described in the following part of the documentation.

## HTML
In the first part, there is the html template of the component part of the page. It is the right side of the white box.
![White box](doc-images/WhiteBox.png "White box")

It is between the template tags.
```html
<template>
	...
</template>
```

[Bootstrap-vue](https://bootstrap-vue.js.org/docs) is used in the application. Please, use this framework.
Most important tags are:
```html
<!-- in the section Layout and Grid System* -->
<b-row>
	...
</b-row>

<b-col cols=''>
	...
</b-col>

<!-- in the section Form** -->
<b-form-input>
	...
</b-form-input>
```
\*[Layout and Grid System](https://bootstrap-vue.js.org/docs/components/layout)\
\*\*[Form](https://bootstrap-vue.js.org/docs/components/form)

## Mathjax
All texts that are supposed to be rendered in LATEX style have to be [binded](#Bind) to this component:
```html
<vue-mathjax :formula="var*"/>
```

\*the name of your variable - it is specified in the [data](#data) section\
The variable has to be in correct LATEX form.\
It has to begin with '$$ and end with $$'.\
All backslashes have to be doubled `\\`.\
Example of this kind of variable:
```javascript
discriminant: '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$',
```

The binding will look like this:
```html
<vue-mathjax :formula="discriminant"/>
```

You can also use "[development components](#development-components)":
```html
<nbsp>
	...
</nbsp>

<hint-form>
	...
</hint-form>

<!-- The next component is used to unify the style of headings of all the tasks. -->
<heading>
	...
</heading>
```

**It is necessary to correctly import all used development components (it will be explained in the following part).**

## Import
This part of the components is importing all external components that are specified there. It is right under this tag:
```html
<script>
```

If you are not using [the development project](https://github.com/kubajj/ComputatisDevelopmentProject), please import these files:
```javascript
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
```
They are necessary for the functioning of all components.

Generally, the process of import is done as follows:
``` javascript
import name* from 'path**'
```
\* name that you will use - *CamelCase is used*\
\*\*relative path to the file


## Vue
This part follows right after the import part. After you close it, close the `</script>` tag.\

It begins like this:
```javascript
	export default {
```

And then you can specify these parts:
```javascript
	data() {
		return {
			...
		}
	},
	components: {
		...
	},
	methods: {
		...
	},
	computed: {
		...
	},	
```

**Each of them has to be closed with curly brace and a comma.** `},`

## Data
In the data part, you can specify your variables
There is used the same syntax as in JS:
``` javascript
name*: value**,
``` 
\*name = name of the variable\
\*\*value = value of the variable
*Each line has to be closed with a comma.*\
More about JS syntax is [here](https://www.w3schools.com/js/js_objects.asp).

These variable can be used in two different ways:
1. `this.var*`
2. `this.$data.var*`\
\*var = name of the variable\
If you use them in the template part, neither prefix `this.`, nor `$data.` are used. Only `{{ ... }}`.

## Components
In this part, the imported external components are used and specified.
They are specified like this:
```javascript
'heading': Heading,
//generally:
'var-name*': ImportedVarName**,
```
\* var-name -> name of the component that you want to use in the template part\
f.e.`'heading'`
'kebab-case' is used for this specification.

\*\* ImportedVarName -> name that was given to it in the import part\

*All lines have to end with a comma.*

## Development components
Each of them has its [props](https://vuejs.org/v2/guide/components-props.html) and a specification of the functioning.
Props (*properties*) are data, which the parent component sends to its children.

### Heading.vue
Props:	
- head (`String`)
```javascript
props: ['head'],
```
Functioning: It unifies the styling of each components headings.

### CheckAlerts.vue
Props: 	
- checked (`String`) 
	- possible values:
		- 'right'
		- 'wrong'
- result (mostly `Integer`, but `String` is also an option)
```javascript
props: ['checked', 'result'],
```
Functioning: It show an alert with `Správně` or `Špatně`, which shows your correct result (so it has to be defined). 

### Nbsp.vue
Props: 	
- num (`Integer`) 
	- between *1* and *5*
```javascript
props: ['num'],
```
Functioning: It prints `&nbsp` (*non-breaking space*) in specified number of times. 

### HintFormBorder.vue
Props: 	
- value (`String`) 
- correctResult (`String`) 
	- correct result of individual inputs
- placeHolder (`String`)
	- placeholder of each input
```javascript
props: {
	value: {
		type: String
	},
	correctResult: {
		type: String
	},
	placeHolder: {
		type: String
	},
},
```
Functioning: It enables you to show multiple inputs with red borders. When the user inputs the correct result, the border sẃitches its color to green. 
Their css class is `class="inputWithBorder"`.
You can also use `v-model`.

If you need any other component and you think that others might also you it, you can code it and then make a pull-request.
*Please for a short description in markdown*

## Methods
There are specified all the methods which reacts to the behavior of the user.
You can specify the in two ways:
```javascript 
genTask() {	
	
genTask: function() {
```
```javascript
	//after '{' is
	this.task = '$$ 1234 $$';
	},
},
```

If your method is too long, you can separate it to more smaller ones and then refer to themselves via `this.` and *parentheses*.
f.e. `this.number = this.randomNumber(1, 999);`

For temporary variables use `var`.\
f.e. `var number = this.randomNumber(1,999);`\
You cannot refer to them from other methods.\
You do not have to specify them in [data](#data) section.

**In methods and in computed section each line has to end with "`;`".**

## Useful methods
### Random Number
It generates a random number from interval in parentheses:
```javascript
randomNumber(min, max) {//this method generates a random number in the interval that was specified in the parentheses
	return Math.floor(Math.random() * (max - min + 1)) + min;
},
```
### Check
It enables you to check the correctness of the user result:
```javascript
check() {
	if (this.checked == 'right') { //if the user result is right and user press enter 2 times, it generates next task
		this.genTask();
		return;
	}
	if (this.usersResult == this.result) { //checks if the user result (inserted to input) is right
		this.checked = 'right';
		this.same = true; //if the hint was not used and user answered correctly, the hint button hides
	} else {
		this.checked = 'wrong';
	}
	document.getElementById("inputForm").value = '';
}, 
```

### Grade
It shows the highest grade of a number:
```javascript
grade(givenNum) {
	return Math.ceil(Math.log10(givenNum));
},
```
(*Can be replaced with `*.length`.*)

### Reset All
It is a method that resets all variables that are specified in it to specified value.
It is easier to do it there than to do it in the genTask method.
example of usage:
```javascript
resetAll() {
	this.hinted = false;
	this.checked = '';
	this.hint = '';
	this.comment = '';
	this.correctCalculation = [];
	for (let i = 0; i < this.resultsInputs.length; i++) {	//resets whole array		
		this.$data.resultsInputs[i] = '';
	}
	this.specialHint = false;
	this.placeHolders = [];
},
```
### Convert Number
It converts numbers from one system to another - (number, from, to):
```javascript
convertNumber(n, fromBase, toBase) {
  	if (fromBase === void 0) {
  	  fromBase = 10;
 	}
 	if (toBase === void 0) {
 	   toBase = 10;
	}
 	return parseInt(n.toString(), fromBase).toString(toBase);
},
```

## Computed
You can specify here variables that have to be computed.\
**The have to end with `return`.**\
In syntax, they are identical to methods:
```javascript
computed: {
	onePlusOne() {
		return 1 + 1;
	},
},
```

More about [computed properties](https://vuejs.org/v2/guide/computed.html).

## Bind
Dynamically bind one or more attributes, or a component prop to an expression.
We can do that via two tags:
1. `v-bind:var*`\
2. `:var*`\
\* name of the binded variable

More about [binding](https://vuejs.org/v2/api/#v-bind).

## Lifecycle Hooks
This is the last type of tags in `export default {}`.
They are the following:
```javascript
beforeCreate() {
	...
},
created() {
	...
},
beforeMount() {
	...
},
mounted() {
	...
},
...
```
You can find them in thus [diagram](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).
They can call methods in a specified time.

example of usage:
```javascript
//The following code has to be in every task component.
beforeMount() {
	this.genTask();
},
mounted() {
    bus.$on('next', this.genTask);
},

//Different usage:
mounted() {
	this.resultsOfUnitInputs = this.correctUnit.map(() => '');
	this.resultsOfDecInputs = this.correctDec.map(() => '');
	this.resultsOfResInputs = this.correctResultSpaces.map(() => '');
}, 
```

**Vue part is closed via `</script>` tag.**

## CSS
CSS is inserted between `<style>` and `</style>` tags.

## Publication of your component
Create a pull-request, in which you push your task and its name.\
Please comment your code and send a short description of its functioning.\
It it is not defective, it will be published.\

## FAQ
*Do you have any Vue.js video tutorial?*\
[![The Net Ninja - Vue.js tutorial](http://img.youtube.com/vi/5LYrN_cAJoA&list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa/0.jpg)](https://www.youtube.com/watch?v=5LYrN_cAJoA&list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa)

*How can I send data from child to parent component?*\
Via [`$emit`](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events).
