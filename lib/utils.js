
var _ = require('underscore'),
    _str = require('underscore.string');

module.exports = {

  capitalize: function(str) {
    return _str.capitalize(str);
  },


  rewriteIds: function (records) {
    return _.map(records, function(record) {
      if (record._id) {
        record.id = record._id.toString();
        delete record._id;
      }
      return record;
    });
  },

  rewriteId: function(rec) {
    if (rec._id) {
      rec.id = rec._id.toString();
    };

    return rec;
  }
};
