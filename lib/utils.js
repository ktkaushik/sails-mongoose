var _ = require('underscore'),
    _str = require('underscore.string');

module.exports = {

  capitalize: function(str) {
    return _str.capitalize(str);
  },


  rewriteIds: function (records) {
    console.log('%%%%%%%%%%%%%%%%%%%%%%% in rewriteIds %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    console.log(records);
    return _.map(records, function(record) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%% in map %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log(record);
      if (record._id) {
        console.log('record');
        record.id = record._id.toString();
        delete record._id;
      }
      return record;
    });
  },

  rewriteId: function(rec) {
    console.log('in %%%%%%%%%%%%%%%%%%% in rewriteId $$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log(rec._id);
    if (rec._id) {
      console.log('in if case &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      rec.id = rec._id.toString();
    };

    return rec;
  }
};
