# DTC CLI reader

A simple command-line-interface quote reader for [DTC](http://danstonchat.com), using [DTCrawler API](https://gitlab.com/Emeraude/DTCrawler).

## Usage

```bash
./reader.js [nb] [-c|--comments=nb]
```

**nb** is the number of the quote you want to read. If not specified, a random quote is picked.  
**-c** option is used if you want to display the comments of the quote. If you use the **--comments=nb** syntax, only *nb* comments will be displayed. They are displayed in the order that they are received.

### Author

Emeraude
