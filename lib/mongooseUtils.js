var _ = require('underscore'),
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = {

  /**
    *
    * Converts the type object that @waterline provides to 
    * a mongoose object and returns it.
    */
  convertToMongooseType: function( val ) {
    console.log( '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% trying to convert into mongooseObject %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%' );
    console.log(typeof val);
    console.log(val);
    switch (val) {
      case 'String':
      case 'STRING':
      case 'string':
      case 'Str':
      case 'str':
        console.log('this is a string');
        // mongooseObject = Schema.Types.String;
        mongooseObject = String;
        break;

      case 'Number':
      case 'NUMBER':
      case 'number':
      case 'Num':
      case 'num':
        mongooseObject = Number;
        break;

      case 'Boolean':
      case 'BOOLEAN':
      case 'boolean':
      case 'Bool':
      case 'bool':
        mongooseObject = Boolean; // no conditional handlers as of now
        break;

      case 'Array':
      case 'ARRAy':
      case 'array':
      case 'Arr':
      case 'arr':
        mongooseObject = Array;
        break;

      case 'Date':
      case 'DATE':
      case 'date':
      case 'Dt':
      case 'dt':
        mongooseObject = Date;
        break;
    }
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% mongooseObject ********************************************************* ');
    console.log(mongooseObject);
    return mongooseObject;
  }
}