const fn = require('./filter_title.js');
const es6 = require('./es6.js');
es6.fn('下午还是很冷');
import {firstName, lastName, year} from './export与export_Default和import/1export与import.js';
console.log(firstName);
console.log(lastName);
console.log(year);

import obj from './export与export_Default和import/2export_default和import.js'
console.log(obj);

document.getElementById('app').appendChild(fn());

require('./todoList.js');

//import './todoList.js'
// import / require

require('../image/big.jpg');
require('../image/small.png');
