'use strict';

const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('wenhua', bcrypt.genSaltSync(10)));
