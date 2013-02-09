var collectionName = 'forums';

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


var ForumsApi = function(_db, callback) {
   callback = _default(callback);
   
   if(!_db) {
      return callback(Error('Database is false.'));
   } else {
      this.db = _db;
      callback(null, this);
   }
};

ForumsApi.prototype.getForums = function(callback) {
   this.db.collection(collectionName, function (err, forums) {
      forums.find({}).toArray(_default(callback));
   });
}

module.exports = ForumsApi;