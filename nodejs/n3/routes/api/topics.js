var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoHelper = require('../../dao/mongoHelper');

var topic = require('../../models/topicModel').Topic;
var topicModel = new mongoHelper(topic);

//topics api

/* GET users listing. */
//getAll
router.get('/', function (req, res) {
    topicModel.getAll(function (err, models) {
        if (err) {
            res.send(err);
        }
        res.json(models);
    });
});

//getById
router.get('/:id', function (req, res) {
    topicModel.getById(req.params.id, function (err, model) {
        if (err)
            res.send(err);
        res.json(model);
    });
});

//insert
router.post('/', function (req, res) {
    var ui = req.session.userInfo;
    var title = req.body.title;
    var content = jc.saveWords(req.body.content);
    var tag = req.body.tab;
    var words = req.body.words.replace('，', ',').replace('｜', ',').replace(' ', '');

    var data = {
        tag: tag,
        title: title,
        content: content,
        words: words,
        user_name: ui.user,
        update_user: ui.user
    }
    //jc.log(topicModel);
    topicModel.create(data, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'created ok!' });
    });
});

router.put('/:id', function (req,res) {
    topicModel.getById(req.params.id, function (err, model) {

        if (err)
            res.send(err);

        if (model) {
            var user = req.body.name || model.user;
            var title = req.body.title || model.title;
            var content = req.body.content || model.content;
            var tag = req.body.tag || model.tag;
            var words = req.body.words || model.words;
            var user_name = req.body.user_name || model.user_name;
            var update_user = req.body.update_user || model.update_user;

            var data = {
                user: user,
                title: title,
                content: content,
                tag: tag,
                words: words,
                user_name: user_name,
                update_user: update_user
            }

            // save topic
            topicModel.update({ _id: req.params.id }, data, {}, function (err, numAffected) {
                if (err)
                    res.send(err);

                res.json({ message: 'updated ok!' });
            });
        }
    });
});


router.delete('/:id', function (req,res) {
    topicModel.delete({ _id: req.params.id }, function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'deleted ok!' });
    });
});

module.exports = router;
