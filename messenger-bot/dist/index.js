'use strict';

// NOTE: This is demo code from: https://github.com/remixz/messenger-bot

var http = require('http');
var Bot = require('messenger-bot');

var bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN,
  app_secret: process.env.APP_SECRET
});

bot.on('error', function (err) {
  console.log(err.message);
});

bot.on('message', function (payload, reply) {
  var text = payload.message.text;

  bot.getProfile(payload.sender.id, function (err, profile) {
    if (err) throw err;

    reply({ text: text }, function (err) {
      if (err) throw err;

      console.log('Echoed back to ' + profile.first_name + ' ' + profile.last_name + ': ' + text);
    });
  });
});

http.createServer(bot.middleware()).listen(3000);
console.log('Echo bot server running at port 3000.');