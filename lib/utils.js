var _ = require('underscore'),
    _str = require('underscore.string');

module.exports = {

  capitalize: function(str) {
    return _str.capitalize(str);
  },


  rewriteIds: function (models) {
  	console.log('%%%%%%%%%%%%%%%%%%%%%%% in rewriteIds %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    return _.map(models, function(model) {
	  	console.log(model);
      if (model._id) {
	  	console.log('model');
        model.id = model._id.toString();
        delete model._id;
      }
      return model;
    });
  }
};
