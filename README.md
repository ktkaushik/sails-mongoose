# Mongoose Adapter for Sails.js

Waterline adapter for Mongoose.

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
  mongo: {
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

## Waterline

[Waterline](https://github.com/balderdashy/waterline) is a brand new kind of storage and retrieval engine.

It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs. That means you write the same code to get users, whether they live in MySQL, LDAP, MongoDB, or Facebook.

### The MIT License (MIT)

Copyright © 2012-2013 Mike McNeil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
