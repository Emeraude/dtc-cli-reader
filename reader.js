#!/usr/bin/env node

var http = require('http');
var color = require('cli-color');

if (process.argv.length < 3
    || !process.argv[2].match(/^\d{1,}$/)) {
  console.error('Usage: ' + process.argv[1] + ' nb');
  process.exit(1);
}

function displayQuote(quote) {
  var colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'black']
  var pseudos = {};

  console.log('#' + quote.id + ' ' + color.green(quote.votes.plus + '(+) ') + color.red(quote.votes.minus + '(-)'));
  var j = 0;
  for (i in quote.content) {
    if (!pseudos[quote.content[i].login]) {
      pseudos[quote.content[i].login] = colors[j];
      ++j;
      if (j >= colors.length)
	j = 0;
    }
    console.log(color[pseudos[quote.content[i].login]].bold(quote.content[i].login) + quote.content[i].line);
  }
}

http.get({host: 'broggit.me', path: '/quote/' + process.argv[2], port: 3001, methode: 'GET'}, function(r) {
  if (r.statusCode != 200) {
    console.error(r.statusMessage);
    process.exit(2);
  }
  var quote = '';
  r.on('data', function(d) {
    quote += d;
  }).on('end', function() {
    displayQuote(JSON.parse(quote));
  });
});
