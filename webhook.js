'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    // and some validation too
    if (!req.body || !req.body.result || !req.body.result.parameters) {
        return res.status(400).send('Bad Request')
    }

    // the value of Action from api.ai is stored in req.body.result.action
    let action = req.body.result.action;
    switch (action) {
        case "resolveName":
            resolveName(req, res);
            break;
        case "setNumber":
            setNumber(req, res);
            break;
        default:
            fallback(req, res);
    }
});

function fallback(req, res) {
    return res.status(400).send('Unknown intent');
}


function resolveName(req, res) {
    var userName = req.body.result.parameters['name']
    var webhookReply = 'Hello ' + userName + '! Welcome from the webhook.'

    // the most basic response
    res.status(200).json({
        source: 'webhook',
        speech: webhookReply,
        displayText: webhookReply
    })
}

function setNumber(req, res) {
    var number = req.body.result.parameters['number']
    var webhookReply = 'Number is set to ' + number;
    if (!number) {
        webhookReply = 'Unknown number';
        return res.status(400).json({
            source: 'webhook',
            speech: webhookReply,
            displayText: webhookReply
        });
    }

    if (number < 5 || number > 100) {
        webhookReply = 'Number must be between 0 and 100';
        return res.status(400).json({
            source: 'webhook',
            speech: webhookReply,
            displayText: webhookReply
        });
    }
    var webhookReply = 'Number is set to ' + number;
    // the most basic response
    res.status(200).json({
        source: 'webhook',
        speech: webhookReply,
        displayText: webhookReply
    })
}


module.exports = router;