// User collection
var users = null;
var _db = null;

function _default(callback) {
   callback = typeof(callback) === 'function' ? 
      callback : 
      function (err, result) { 
         if(err) {
            console.info(err);
         } else {
            console.info('mongo success');
         }
      };
   return callback;
}

var UserApi = module.exports = function(db, callback) {
   callback = _default(callback);
   
   if(!db) {
      return callback(Error('Database is false.'));
   } else {
      _db = db;
      callback(null, this);
   }
};

UserApi.prototype.getUserProfile = function(id, callback) {
   _db.collection('users', function (err, users) {
      if(err) {
         console.dir(err);
      } else {
         users.findOne({_id:id}, _default(callback));
      }
   });
};

UserApi.prototype.updateUserProfile = function(id, profile, callback) {
   console.log('updating ', id);
   _db.collection('users', function (err, users) {
      if(err) {
         console.dir(err);
      } else {
         console.info('--- updating ', id);
         users.update({_id:id}, {$set: profile}, {upsert:true}, _default(callback));
      }
   });
};