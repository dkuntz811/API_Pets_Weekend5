var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = require('../connection');

router.get('/count', function (req, res){
  pg.connect(connection, function (err, client, done){
    if(err){
      console.log('connection error:', err);
    }
    client.query('SELECT COUNT(id) as count FROM faves',
       function(err, result){
         done();

         if(err){
           console.log('query error:', err);
           res.sendStatus(500);
         } else{
           res.send(result.rows[0]);
         }
       });
  });
});

router.post('/', function  (req, res){
  var favorite = req.body;
  console.log('fav:', favorite);
  pg.connect(connection, function(err, client, done){
    if(err){
      console.log('connection error', err);
    }
    client.query('INSERT INTO faves ' +
  ' (pet_id, pet_image_url, pet_name, pet_description)' +
  ' VALUES($1, $2, $3, $4)',
    [favorite.pet_id, favorite.image, favorite.pet_name, favorite.description],
    function (err, result){
      done();
      if (err) {
        console.log('query error:', err);
        res.sendStatus(500);
      }
      else{
        res.sendStatus(201);
      }
    });
  });
});

router.get('/', function(req, res){
  pg.connect(connection, function(err, client, done){
    if(err) {
      console.log('connection error:', err);
    }
    client.query('SELECT * FROM faves',
    function (err, result){
      done();

      if (err){
        console.log('query error:', err);
        res.sendStatus(500);
      }
      else{
        res.send(result.rows);
      }
    });
  });
});

router.delete ('/:pet_id', function (req, res){
  pg.connect(connection, function(err, client, done){
    if (err) {
      res.sendStatus(500);
      console.log('error deleting pet');
    }
    client.query('DELETE FROM faves ' +
                  'WHERE pet_id = $1',
                   [req.params.pet_id],
                 function (err, result){

                   done();
                   if (err) {
                     res.sendStatus(500);
                     console.log('error is here')
                     return;
                   }  else {
                     console.log('I am here');
                     res.sendStatus(200);

                   }

                 });
  });
});

module.exports = router;
