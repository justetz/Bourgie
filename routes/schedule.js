var express = require('express');
var router = express.Router();
var pool = require('../db').pool;

router.get('/:username', function(req, res, next) {

  var user = req.params.username;

  var sql = 'SELECT '+
              'schedule_id, '+
              'user_category_id, '+
              'name, '+
              'amount, '+
              'repeat_interval, '+
              'UNIX_TIMESTAMP(next_due_date) as next_due_date '+
            'FROM schedules '+
            'WHERE username = "'+ user + '"';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({type : true,
                  data : rows,
                  err  : null});
      } else {
        res.send({type : false,
                  data : null,
                  error : err});
      };
    })
  });
});

router.put('/:id', function(req, res, next) {

  var id = req.params.id;
  var category = req.body.category;
  var name = req.body.name;
  var amount = req.body.amount;
  var interval = req.body.interval;
  var due = req.body.date;

  var sql = 'UPDATE schedules '+
            ' SET user_category_id = '+ category +
            ', name = "'+ name +'", amount = '+ amount +
            ', repeat_interval = "'+ interval +'", next_due_date = "'+ due +
            '" WHERE schedule_id = '+ id;

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        res.send({
          type : false,
          data : { user_category_id : id},
          error : err
        });
      };
    });
  });
});

router.post('/', function(req, res, next) {

  var user = req.body.username;
  var category = req.body.category;
  var name = req.body.name;
  var amount = req.body.amount;
  var interval = req.body.interval;
  var due = req.body.date;

  var sql = 'INSERT INTO schedules '+
            '(username, user_category_id, name, amount, repeat_interval, next_due_date) ' +
            'VALUES ("'+ user +'",'+ category +',"'+ name +'",'+ amount +
            ',"'+ interval +'","'+ due +'")';

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      console.log(0);
      db.release();
      if (!err){
        console.log(1);
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        console.log(2);
        res.send({
          type : false,
          data : { name : name},
          error : err
        });
      };
    });
  });
});

router.delete('/:id', function(req, res, next) {

  var id = req.params.id;

  var sql = 'DELETE FROM schedules '+
            'WHERE schedule_id = '+id;

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        res.send({
          type : false,
          data : { user_category_id : id },
          error : err
        });
      };
    });
  });
});

module.exports = router;
