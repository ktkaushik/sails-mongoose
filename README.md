# Mongoose Adapter for Sails.js

Waterline adapter for Mongoose.

**Not maintained anymore**

![Project unmaintained](https://img.shields.io/badge/project-unmaintained-red.svg)

[Update via tweet](https://twitter.com/ktkaushik/status/380592073482588160)

## Installation

Install from NPM.

```bash
$ npm install sails-mongoose
```

## Sails Configuration

Add the mongo config to the config/adapters.js file:

```javascript
module.exports.adapters = {
  'default': 'mongoose',

  // sails v.0.9.0
  mongoose: {
    module   : 'sails-mongoose',
    host     : 'localhost',
    user     : 'username',
    password : 'password',
    database : 'your mongo db name here'
  }

};
```

## Usage

We're trying hard to get the mongoose adapter completely up and running for Sailsjs. So currently when you generate a model instead of specifying `mongo` as an adapter you mention `mongoose`.

`Inside your model`

```javascript
module.exports = {
  schema: true,
  adapter: 'mongoose',
  attributes: {

    name: 'String',
    age: 'Number'

  },
```

As of now, only the basic __CRUD__ operations are supported.

## Sails.js

http://sailsjs.org

### The MIT License (MIT)

Copyright © 2013-2015 Kaushik Thirthappa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
