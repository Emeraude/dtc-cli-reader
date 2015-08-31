#!/usr/bin/env node

var http = require('http');
var _ = require('lodash');
var color = require('cli-color');

var host = 'broggit.me';
var port = 3001;
var commentsNb = null;
var id = null;

for (i in process.argv) {
  if (process.argv[i].match(/^(-h|--help)$/)) {
    console.error('Usage: ' + process.argv[1] + ' [-c|--comments=nb] [--host HOST] [-p|--port PORT] [nb]');
    process.exit(0);
  }
  if (process.argv[i].match(/^(-c|--comments)$/))
    commentsNb = -1;
  else if (process.argv[i].match(/^(-p|--port)$/))
    port = process.argv[++i];
  else if (process.argv[i] == '--host')
    host = process.argv[++i];
  else if (process.argv[i].match(/^--comments=/))
    commentsNb = parseInt(process.argv[i].substr(11));
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

  if (commentsNb != null) {
    var comments = _.sortBy(quote.comments, function(c) {
      return c.votes.minus - c.votes.plus;
    });

    console.log('------------------');
    for (i in comments) {
      if (commentsNb != -1 && parseInt(i) >= commentsNb)
	break;
      var msg = '#' + comments[i].id + ' ';
      if (comments[i].author.name)
	msg += color.black.bold(comments[i].author.name) + ' ';
      console.log(msg + color.green(comments[i].votes.plus + '(+) ') + color.red(comments[i].votes.minus + '(-)'));
      content = comments[i].content;
      while (content.match(/\n\n/))
	content = content.replace(/\n\n/g, '\n');
      console.log(content);
      console.log('------------------');
    }
  }
}

http.get({host: host, path: '/quote/' + (id || 'random'), port: port, methode: 'GET'}, function(r) {
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
