var MongoClient = require('mongodb').MongoClient,
MONGODB_URI = 'mongodb://localhost:27017/nodecms',
mongoPool;

/*
* Create Mongo Connection Pool.
*/
MongoClient.connect(MONGODB_URI, function(err, db) {
  if(err){
    console.error('Error DB connection : %s ', err);
    db.close();
  }else{
    console.log('Success! Connected to mongoDB ('+MONGODB_URI+').');
    mongoPool=db;
  }
});


 exports.list = function(req, res){
    mongoPool.collection('users').find().toArray(function(err, result) {
      if(err){
        console.error(err);
      }
      //console.log('Kev:list result ===', result);
      res.render('users',{page_title:'Users - Node CMS',data:result});
    });
  }

  exports.add = function(req, res){
    res.render('add_users',{page_title:'Add Users - Node CMS'});
  }

  exports.edit = function(req, res){
    var id = req.params.id; //string
    mongoPool.collection('users').find({'uid': id}).toArray(function(err, result) {
      if (err) {
        console.log('Error editing : %s ',err );
      }
      res.render('edit_users',{page_title:"Edit Users - Node CMS",data:result});
    });
  }

  exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        uid : input.uid,
        name    : input.name,
        address : input.address,
        email   : input.email,
        phone   : input.phone
    };
    //console.log('Kev:save data ===', data);
    //insert new
    mongoPool.collection('users').update({'uid': data.uid}, data, {upsert:true}, function(err, doc){
      if (err){
        console.log('Error inserting : %s ',err );
      }
      res.redirect('/users');
    });
 }

 exports.save_edit = function(req,res){

     var input = JSON.parse(JSON.stringify(req.body));
     var id = req.params.id;//string

     var data = {
         uid : input.uid, //overrided by param id
         name    : input.name,
         address : input.address,
         email   : input.email,
         phone   : input.phone
     };
     //update exist
     mongoPool.collection('users').update({'uid': id}, data, {upsert:false}, function(err, doc){
       if (err){
         console.log('Error inserting : %s ',err );
       }
       res.redirect('/users');
     });
 }


 exports.delete = function(req,res){
   var id = req.params.id;//string
   mongoPool.collection('users').remove({'uid': id}, {justOne:false}, function(err, result){
     if (err){
       console.log('Error inserting : %s ',err );
     }
     res.redirect('/users');
   });
 }



    //TODO: 2.0 update mysql support
    // exports.list = function(req, res){
    //
    //   req.getConnection(function(err,connection){
    //
    //         var query = connection.query('SELECT * FROM customer',function(err,rows)
    //         {
    //
    //             if(err)
    //                 console.log("Error Selecting : %s ",err );
    //
    //             res.render('customers',{page_title:"Customers - Node.js",data:rows});
    //
    //
    //          });
    //
    //          //console.log(query.sql);
    //     });
    //
    // };
    //
    // exports.add = function(req, res){
    //   res.render('add_customer',{page_title:"Add Customers - Node.js"});
    // };
    //
    // exports.edit = function(req, res){
    //
    //     var id = req.params.id;
    //
    //     req.getConnection(function(err,connection){
    //
    //         var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
    //         {
    //
    //             if(err)
    //                 console.log("Error Selecting : %s ",err );
    //
    //             res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
    //
    //
    //          });
    //
    //          //console.log(query.sql);
    //     });
    // };
    //
    // /*Save the customer*/
    // exports.save = function(req,res){
    //
    //     var input = JSON.parse(JSON.stringify(req.body));
    //
    //     req.getConnection(function (err, connection) {
    //
    //         var data = {
    //
    //             name    : input.name,
    //             address : input.address,
    //             email   : input.email,
    //             phone   : input.phone
    //
    //         };
    //
    //         var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
    //         {
    //
    //           if (err)
    //               console.log("Error inserting : %s ",err );
    //
    //           res.redirect('/customers');
    //
    //         });
    //
    //        // console.log(query.sql); get raw query
    //
    //     });
    // };
    //
    // exports.save_edit = function(req,res){
    //
    //     var input = JSON.parse(JSON.stringify(req.body));
    //     var id = req.params.id;
    //
    //     req.getConnection(function (err, connection) {
    //
    //         var data = {
    //
    //             name    : input.name,
    //             address : input.address,
    //             email   : input.email,
    //             phone   : input.phone
    //
    //         };
    //
    //         connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
    //         {
    //
    //           if (err)
    //               console.log("Error Updating : %s ",err );
    //
    //           res.redirect('/customers');
    //
    //         });
    //
    //     });
    // };
    //
    //
    // exports.delete = function(req,res){
    //
    //      var id = req.params.id;
    //
    //      req.getConnection(function (err, connection) {
    //
    //         connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
    //         {
    //
    //              if(err)
    //                  console.log("Error deleting : %s ",err );
    //
    //              res.redirect('/customers');
    //
    //         });
    //
    //      });
    // };
