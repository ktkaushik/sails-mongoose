var _ = require('underscore'),
    _str = require('underscore.string');

module.exports = {

  capitalize: function(str) {
    return _str.capitalize(str);
  },


  rewriteIds: function (records) {
  	console.log('%%%%%%%%%%%%%%%%%%%%%%% in rewriteIds %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    return _.map(records, function(record) {
	  	console.log(record);
      if (record._id) {
	  	console.log('record');
        record.id = record._id.toString();
        delete record._id;
      }
      return record;
    });
  }
};
