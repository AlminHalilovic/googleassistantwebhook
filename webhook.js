'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    // we expect to receive JSON data from api.ai here.
    // the payload is stored on req.body
    //console.log(req.body)
    // console.log(JSON.stringify(req.body));

    // we have a simple authentication
    // if (REQUIRE_AUTH) {
    //   if (req.headers['auth-token'] !== AUTH_TOKEN) {
    //     return res.status(401).send('Unauthorized')
    //   }
    // }

    // and some validation too
    if (!req.body || !req.body.result || !req.body.result.parameters) {
        return res.status(400).send('Bad Request')
    }

    // the value of Action from api.ai is stored in req.body.result.action
    console.log('* Received action -- %s', req.body.result.action)

    // parameters are stored in req.body.result.parameters
    var userName = req.body.result.parameters['name']
    var webhookReply = 'Hello ' + userName + '! Welcome from the webhook.'

    // the most basic response
    res.status(200).json({
        source: 'webhook',
        speech: webhookReply,
        displayText: webhookReply
    })
});

module.exports = router;