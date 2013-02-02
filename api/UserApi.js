// User collection
var users = null;

function _default(callback) {
  callback = typeof(callback) === 'function' ? callback : function (err, result) { if(err) {console.log(err)}};
  return callback;
}

var UserApi = module.exports = function(db, callback) {
   callback = _default(callback);
   
   if(!db) {
      return callback(Error('Database is false.'));
   } else {
      db.collection('users', function (err, col) {
         if (err) callback(err);
         users = col;
         callback(null, this);
      });
   }
};

UserApi.prototype.getUserProfile = function(id, callback) {
   users.findOne({_id:id}, _default(callback));
};

UserApi.prototype.updateUserProfile = function(id, profile, callback) {
   user.update({_id:id}, {$set: profile}, {}, _default(callback));
};