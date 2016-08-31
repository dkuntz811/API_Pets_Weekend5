var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';
var favorites = require('../routes/favorites');


router.post('/', function (req, res){

    var favePets = [];
		var id = req.body;
		console.log(id);

	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
		}
		client.query('INSERT INTO faves(pet_id, pet_image_url, pet_name, pet_description, pet_image) ' +
	                'VALUES($1, $2, $3, $4); ',
								[fave.petID, fave.name, fave.description, fave.image],
							function (err, results){
								done();
								if (err) {
									res.sendStatus(500);
								}
								res.send(results.rows);
							});
	});
});

module.exports = router;
