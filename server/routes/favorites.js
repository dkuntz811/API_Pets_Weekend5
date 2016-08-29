var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';


router.post('/', function (req, res){

    var favePets = [];
		var id = req.body;
		console.log(id);

	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
		}
		client.query('INSERT INTO pets(id, pet_name, pet_description, pet_image) ' +
	                'VALUES($1, $2, $3, $4); ',
								[id, pet_name, pet_description, pet_image],
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
