/*---------------------------------------------------------------
  :: sails-mongoose
  -> adapter
---------------------------------------------------------------*/

var async = require('async'),
    _ = require('underscore'),
    criteria = require('./criteria'),
    utils = require('./utils'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/sails'),
    Schema   = mongoose.Schema,
    monUtils = require('./mongooseUtils');

module.exports = (function() {

  // Keep track of all the dbs used by the app
  var dbs = {},
      schemaStash = {};

  var modelName;

  // Holds an open connection
  var connection = {};

  var adapter = {
    syncable: true, // to track schema internally

    defaults: {
      host: 'localhost',
      database: 'sails',
      port: 27017,
      schema: false,
      nativeParser: false,
      safe: true,
      user: 'root', // find a way to determine this ?
      module: 'sails-mongoose'
    },

    registerCollection: function(collection, cb) {
      var self = this,
          collectionName;

      // If the configuration in this collection corresponds
      // with a known database, reuse it the connection(s) to that db
      collectionName = utils.capitalize(collection.identity);
      dbs[ collectionName ] = _.find(dbs, function(db) {
        return mongoose.models[ collectionName ];
      });

      // Otherwise initialize for the first time
      if (!dbs[ collectionName ]) {
        dbs[ collectionName ] = mongoose.model( collectionName, new Schema({}) );
      }

      // adding defaults to every mongoose model
      dbs[ collectionName ].config = this.defaults;

      return cb();
    },

    teardown: function(cb) {
      if(cb) cb();
    },

    describe: function(collectionName, cb) {
      collectionName = utils.capitalize( collectionName );
      if ( !dbs[ collectionName ] ) {
        err = "Something went wrong with initializing " + collectionName + " as a model";
        return cb(err, null);
      } else{
        schema = dbs[ collectionName ].schema;
        return cb(null, schema);
      }
    },

    define: function(collectionName, definition, cb) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('******************** you are in define **************************************************************');
      spawnConnection(function __DEFINE__(connection, cb) {
        connection.createCollection(collectionName, function __DEFINE__(err, result) {
          // console.log('******************** you are in createCollection **************************************************************');
          if (err) return cb(err);

          // Use the collection to perform index queries
          connection.collection(collectionName, function(err, collection) {
            // console.log('******************** you are in connection.collection  **************************************************************');
            var index, tempSchema,
                schemaObject = {} ;

            // Clone the definition
            var def = _.clone(definition);
            // console.log('************** def *********************************');
            function processKey(key, cb) {
              // console.log('************* you are in processKey ****************');
              // console.log('************* key ****************');
              // console.log( key );
              // console.log('************* def[key] ****************');
              // console.log( def[key] );
              // Remove any autoIncement keys, Mongo won't support them without
              // a hacky additional collection
              if(def[key].autoIncrement) {
                delete def[key].autoIncrement;
              }

              schemaObject[ key ] = monUtils.convertToMongooseType( def[key]['type'] );

              // console.log(' ======================================== schemaObject ==========================================');
              // console.log( schemaObject );

              // Mongoose will create a _id element for each schema object
              if (key === 'id') {
                delete key;
              }else if(typeof tempSchema !== 'undefined'){
                // console.log(' ======================== tempSchema is defined ==================== ');
                // console.log( utils.capitalize(collectionName) );
                tempSchema.add( schemaObject );
              }else {
                // console.log(' ======================== tempSchema is undefined ==================== ');
                // console.log( utils.capitalize(collectionName) );
                tempSchema = new Schema( schemaObject );
              }

              // console.log('******************** tempSchema **************************************************************');
              // console.log( tempSchema );

              modelName = utils.capitalize( collectionName );

              dbs[modelName] = mongoose.model(modelName, tempSchema);

              // console.log(' %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Mongoose model %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
              // console.log( dbs );

              // Handle Unique Key
              // if(def[key].unique) {
              //   index = {};
              //   index[key] = 1;

              //   return collection.ensureIndex(index, { unique: true, sparse: true }, function(err) {
              //     if(err) return cb(err);
              //     def[key].indexed = true;
              //     cb();
              //   });
              // }

              // // Add non-unique indexes
              // if(def[key].index && !def[key].unique) {
              //   index = {};
              //   index[key] = 1;

              //   return collection.ensureIndex(index, { unique: true, sparse: true }, function(err) {
              //     if(err) return cb(err);
              //     def[key].indexed = true;
              //     cb();
              //   });
              // }

              return cb();
            }

            var keys = Object.keys(def);

            // Loop through the def and process attributes for each key
            async.forEach(keys, processKey, function(err) {
              // console.log(' %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% in async.forEach %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
              if(err) return cb(err);
              // dbs[collectionName].schema = def;
              // cb(null, dbs[collectionName].schema);
              cb(null, null);
            });
          });
        });
      }, dbs[collectionName].config, cb);
    },

    drop: function(collectionName, cb) {
      spawnConnection(function __DROP__(connection, cb) {
        connection.dropCollection(collectionName, function __DEFINE__(err, result) {
          if (err) return cb(err);
          cb(null, result);
        });
      }, dbs[collectionName].config, cb);
    },

    /**
     * Give access to a native mongo collection object for running custom
     * queries.
     *
     * Returns (err, collection, cb);
     */

    native: function(collectionName, cb) {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      if(Object.keys(connection).length > 0) {
        return afterwards();
      }

      createConnection(dbs[collectionName].config, function(err, db) {
        connection = db;
        afterwards();
      });

      function afterwards() {
        connection.collection(collectionName, function(err, collection) {
          return cb(err, collection);
        });
      }
    },

    create: function(collectionName, data, cb) {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$     create       $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log( data );
      var modelName, modelInstance, tempObject;

      modelName = utils.capitalize( collectionName );
      modelInstance = mongoose.models[ modelName ];
      tempObject = new modelInstance;

      for(i in data){
        console.log('given %%%%%%%%%% = ' + data[i]);
        tempObject[i] = data[i];
        console.log('taken %%%%%%%%%% = ' + tempObject[i]);
      };

      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ tempObject ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      console.log(tempObject);
      console.log(tempObject.name);
      console.log(tempObject.createdAt);
      console.log(tempObject.updatedAt);

      // tempObject = tempObject.toJSON();

      tempObject.save(function(err, record, numberAffected) {
        console.log('%%%%%%%%%%%%%%%%%%%%% inside the save function %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        if (err) cb(err);
        console.log('record ************************************************************************');
        console.log(typeof record);
        console.log(record.name);
        console.log('************ ' + numberAffected + '************************************************************');
        console.log('record ************************************************************************');
        cb(err, utils.rewriteId( record ));
      });

      /*
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          var tempObject;

          if (err) return cb(err);
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ data ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
          console.log(data);
          tempObject = new dbs[ utils.capitalize( collectionName ) ];
          for(i in data){
            console.log('given %%%%%%%%%% = ' + data[i]);
            tempObject[i] = data[i];
            console.log('taken %%%%%%%%%% = ' + tempObject[i]);
          }
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ tempObject ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
          console.log(tempObject);
          console.log(tempObject.name);
          console.log(tempObject.createdAt);
          console.log(tempObject.updatedAt);
          tempObject.save();
          // tempObject.save(function() {
            // console.log('message');
          // });
          tempObject.save(function(err, record) {
            console.log('%%%%%%%%%%%%%%%%%%%%% inside the save function %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            if (err) cb(err);
            console.log('record ************************************************************************');
            console.log(record);
            console.log(record.name);
            console.log('record ************************************************************************');
            cb(err, utils.rewriteId( record ));
          });

          // collection.insert(data, function(err, results) {
          //   if (err) return cb(err);
          //   cb(err, utils.rewriteIds(results)[0]);
          // });
        });
      }, dbs[ utils.capitalize( collectionName ) ].config, cb);
      */
    },

    /**
      *
      *  NOT SURE WHAT THIS IS.
      *
    createEach: function(collectionName, data, cb) {
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          if (err) return cb(err);

          collection.insert(data, function(err, results) {
            if (err) return cb(err);
            cb(null, utils.rewriteIds(results));
          });
        });
      }, dbs[ utils.capitalize( collectionName ) ].config, cb);
    },
    */

    find: function(collectionName, options, cb) {

      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INT THE FINDER !!! %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

      var modelInstance, modelName;

      modelName = utils.capitalize( collectionName );
      modelInstance = mongoose.models[ modelName ];

      if (options.where.id != 'create') {
        options.query = monUtils.covertIdForMongoose( options.where );
      }else {
        console.log(options.where);
        options.query = options.where;
      }

      console.log('&&&&&&&&&&&&&&&&&& options after pre processing &&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(options);

      modelInstance.find(options.query, function(err, records) {
        if(err) throw err;
        return cb(err, utils.rewriteIds(records));
      });
      // console.log(dbs[ utils.capitalize(collectionName) ]);
      /*
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          if (err) return cb(err);

          // Transform criteria to a mongo query
          // console.log( '**************************  criteria from sails-mongoose ******************************************' );
          // console.log(criteria.parseFindOptions(options));
          options = criteria.rewriteCriteria(options, schemaStash[collectionName]);

          modelName = utils.capitalize( collectionName );
          modelInstance = dbs[ modelName ];

          // console.log( modelInstance );
          // console.log( mongoose.models.Person );
          // console.log('****************************************************************************************************************************');
          // var a = new mongoose.models[modelName];
          // a.name = 'from-sails-mongoose';
          // console.log(a);
          // // console.log( a.save() );
          // a.save();
          // a.save(function (err, me) {
          //   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tried to save record %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          //   if (err) return cb(err);
          //   console.log(me);
          //   cb(err, utils.rewriteIds( me ));
          // });
          var model = mongoose.models[modelName];
          // console.log(model.find());

          console.log( '****************' + modelName );
          // console.log( dbs[modelName] );
          // model.find(function() {});
          console.log(typeof modelInstance());
          modelInstance().find(function() {
            console.log('**************************** in side find %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          });
          modelInstance.find(options.where,function(err, records) {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% tried to fetch records %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            // console.log( records );
            if (err) return cb(err);
            return cb(err, utils.rewriteIds( records ));
          });

          // collection.find.apply(collection, criteria.parseFindOptions(options))
          // .toArray(function(err, docs) {
          //   console.log('******************** inside the apply *************************');
          //   console.log( docs );
          //   cb(err, utils.rewriteIds(docs));
          // });
        });
      }, dbs[ utils.capitalize(collectionName) ].config, cb);
      */

    },

    update: function(collectionName, options, values, cb) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log('YOU ARE IN UPDATE IN SAILS MONGOOSE');
      var self = this,
          modelName, modelInstance, objectFound;

      modelName = utils.capitalize(collectionName);
      modelInstance = mongoose.models[ modelName ];

      console.log( '*************** values ***********************' );
      console.log(values);

      console.log('************************************ options ****************************************');
      console.log(options);

      options.query = monUtils.covertIdForMongoose( options.where );

      console.log('&&&&&&&&&&&&&&&&&& options after pre processing &&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(options);

      modelInstance.findOne(options.query, function(err, record) {
      // modelInstance.findOne({_id: '5202277dc47f080000000001'}, function(err, record) {
        console.log('*********************************** IN FINDONE ****************************************');
        if (err) return cb(err);
        console.log(' ################### printing record #################################');
        console.log(record);
        /**
          *
          * TODO: Write an else case
          *
          */
        if (record) {
          /* update the record */
          for(i in values){
            console.log('given %%%%%%%%%% = ' + values[i]);
            record[i] = values[i];
            console.log('taken %%%%%%%%%% = ' + record[i]);
          }

          record.save(function(err, record) {
            if (err) throw err;
            console.log(' ################### printing record #################################');
            console.log(' ################### printing record #################################');
            console.log(' ################### printing record #################################');
            console.log(record);
            return cb(err, utils.rewriteId(record));
          });
        };
      }); // End of findOne

      /*
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          if (err) return cb(err);

          // Transform criteria to a mongo query
          options = criteria.rewriteCriteria(options);

          // Transform values to a mongo query
          values = criteria.rewriteValues(values);

          // Lookup records being updated and grab their ID's
          // Useful for later looking up the record after an insert
          // Required because options may not contain an ID
          collection.find(options.where).toArray(function(err, records) {
            if(err) return cb(err);
            if(!records) return cb(new Error('Could not find any records to update'));

            // Build an array of records
            var updatedRecords = [];

            records.forEach(function(record) {
              updatedRecords.push(record._id);
            });

            // Update the records
            collection.update(options.where, values, { multi: true }, function(err, result) {
              if(err) return cb(err);

              // Look up newly inserted records to return the results of the update
              collection.find({ _id: { '$in': updatedRecords }}).toArray(function(err, records) {
                if(err) return cb(err);
                cb(null, utils.rewriteIds(records));
              });
            });
          });
        });
      }, dbs[collectionName].config, cb);
      */
    },

    destroy: function(collectionName, options, cb) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%% in DELETE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

      var modelName, modelIntance, tempObject;

      modelName = utils.capitalize( collectionName );
      modelInstance = mongoose.models[ modelName ];

      options = criteria.rewriteCriteria(options);

      modelInstance.remove(options.where, function(err, records) {
        if (err) return cb(err);
        
        return cb(null, utils.rewriteIds( records ));
      });
      
      /**
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          if (err) return cb(err);

          modelInstance = dbs[ utils.capitalize( collectionName ) ];
          modelName = utils.capitalize( collectionName );
          model = mongoose.models[modelName];


          // Transform criteria to a mongo query
          options = criteria.rewriteCriteria(options);

          model.remove(options.where, function(err, records) {
            if (err) return cb(err);

            // Force to array to meet Waterline API
            var resultsArray = [];

            // If result is not an array return an array
            if(!Array.isArray(results)) {
              resultsArray.push({ id: results });
              return cb(null, resultsArray);
            }

            // Create a valid array of IDs
            results.forEach(function(result) {
              resultsArray.push({ id: result });
            });

            cb(null, utils.rewriteIds(resultArray));

          });

          // collection.remove(options.where, function(err, results) {
          //   if(err) return cb(err);

          //   // Force to array to meet Waterline API
          //   var resultsArray = [];

          //   // If result is not an array return an array
          //   if(!Array.isArray(results)) {
          //     resultsArray.push({ id: results });
          //     return cb(null, resultsArray);
          //   }

          //   // Create a valid array of IDs
          //   results.forEach(function(result) {
          //     resultsArray.push({ id: result });
          //   });

          //   cb(null, utils.rewriteIds(resultArray));
          // });
        });
      }, dbs[collectionName].config, cb);
      */
    },

    // Stream one or more models from the collection
    // using where, limit, skip, and order
    // In where: handle `or`, `and`, and `like` queries
    stream: function(collectionName, options, stream) {
      spawnConnection(function(connection, cb) {
        connection.collection(collectionName, function(err, collection) {
          if (err) return cb(err);

          // Transform criteria to a mongo query
          options = criteria.rewriteCriteria(options);

          var dbStream = collection.find.apply(collection, criteria.parseFindOptions(options)).stream();

          // For each data item
          dbStream.on('data', function(item) {

            // Pause stream
            dbStream.pause();

            var obj = utils.rewriteIds([item])[0];

            stream.write(obj, function() {
              dbStream.resume();
            });

          });

          // Handle error, an 'end' event will be emitted after this as well
          dbStream.on('error', function(err) {
            stream.end(err); // End stream
            cb(err); // Close connection
          });

          // all rows have been received
          dbStream.on('end', function() {
            stream.end();
            cb();
          });
        });
      }, dbs[collectionName].config);
    },

    identity: 'sails-mongoose'
  };

  function spawnConnection(logic, config, cb) {
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& spawnConnection &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    // Grab the existing connection
    if(Object.keys(connection).length > 0) {
      return afterwards();
    }

    createConnection(config, function(err, db) {
      connection = db;
      afterwards();
    });

    function afterwards() {
      logic(connection, function(err, result) {
        if(cb) return cb(err, result);
      });
    }
  }

  function createConnection(config, cb) {
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& createConnection &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    var server = new Server(config.host, config.port, {native_parser: config.nativeParser});
    var db = new Db(config.database, server, {safe: config.safe, native_parser: config.nativeParser});

    db.open(function(err) {
      if (err) return cb(err);
      cb(null, db);
    });
  }

  return adapter;
})();
