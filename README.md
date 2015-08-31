# DTC CLI reader

A simple command-line-interface quote reader for [DTC](http://danstonchat.com), using [DTCrawler API](https://gitlab.com/Emeraude/DTCrawler).

## Usage

```bash
./reader.js [-c|--comments=nb] [--host HOST] [-p|--port PORT] [nb]
```

**-c** option is used if you want to display the comments of the quote. If you use the **--comments=nb** syntax, only *nb* comments will be displayed. They are displayed in the order that they are received.  
**--host** is used to change the remote host.  
**-p** is used to change the connection port.  
**nb** is the number of the quote you want to read. If not specified, a random quote is picked.

### Author

Emeraude
