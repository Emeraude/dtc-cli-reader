#!/usr/bin/env node

var http = require('http');
var color = require('cli-color');

var comments = null;
var id = null;

for (i in process.argv) {
  if (process.argv[i].match(/^(-h|--help)$/)) {
    console.error('Usage: ' + process.argv[1] + ' [nb] [-c|--comments=nb]');
    process.exit(0);
  }
  if (process.argv[i].match(/^(-c|--comments)$/))
    comments = -1;
  else if (process.argv[i].match(/^--comments=/))
    comments = parseInt(process.argv[i].substr(11));
  else
    id = parseInt(process.argv[i]);
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

  console.log(comments);
  if (comments != null) {
    console.log('------------------');
    for (i in quote.comments) {
      if (comments != -1 && parseInt(i) >= comments)
	break;
      var msg = '#' + quote.comments[i].id + ' ';
      if (quote.comments[i].author.name)
	msg += color.black.bold(quote.comments[i].author.name) + ' ';
      console.log(msg + color.green(quote.comments[i].votes.plus + '(+) ') + color.red(quote.comments[i].votes.minus + '(-)'));
      content = quote.comments[i].content;
      while (content.match(/\n\n/))
	content = content.replace(/\n\n/g, '\n');
      console.log(content);
      console.log('------------------');
    }
  }
}

http.get({host: 'broggit.me', path: '/quote/' + (id || 'random'), port: 3001, methode: 'GET'}, function(r) {
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
