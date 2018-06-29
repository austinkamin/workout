var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogModel = sequelize.import('../models/log');

router.post('/create', function (req, res) {
    console.log(req.user)
    var description = req.body.description;
    var definition = req.body.definition;
    var result = req.body.result;
    var owner = req.user.id;

    LogModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner: owner
        })
        .then(
            function logSuccess(log) {
                res.json({
                    log: log
                });
            },
            function logError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/getall', function (req, res) {
    var owner = req.user.id;

    LogModel
        .findAll({
            where: { owner }
                     
                })
        .then(
            function getAllSuccess(data) {
                res.json(data);
            },
            function getAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/getone/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;
    
    LogModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function getOneSuccess(data) {
                res.json(data);
            },
            function getOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;
    var description = req.body.description;
    var definition = req.body.definition;
    var result = req.body.result;
    var owner = req.user.id;

    LogModel
        .update({
            description: description,
            definition: definition,
            result: result
        },
        {where: {id: data, owner: userid}}

        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    description: description,
                    definition: definition,
                    result: result,
                    owner: owner
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    LogModel
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});

module.exports = router;