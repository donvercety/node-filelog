### log your data to files

This module gives you the ability to log to files, it uses two logging methods: `msg()` and `err()`. As expected `msg()` is for normal logging, you should use `err()` to log critical system errors. The logger makes a filename with the current date, this way it separates a different log file for each day. Each file row starts with a timestamp when the log occurred, followed by the keyword in brackets. All this makes it extremely easy for filtering the files with tools like `grep`.

#### Simple Usage:
```js
var logger = require('./mylogger'),
    log = new logger();

log.msg('test', 'this is a test log message'); // <163751[test]> this is a test log message

log.err('database', 'authentication error');   // <163751[database]> authentication error
```

By default the module uses the two folders `msg`  and `err` located in the module directory to log your data by default. You can custom add your own folders to log just by adding two parameters when instantiating the logger object. ( **Folders must exist!** )

```js
log = new logger('/path/to/msg-folder', '/path/to/err-folder');
```

The first parameter is the so called 'keyword', helpful for tagging different logs. If you just want the plain log with no keywords only time and log data use.

```js
log.useShortLog();
 
log.msg('this is a test log message'); // <164924> this is a test log message
log.err('authentication error');       // <164924> authentication error
```

The format of the date and time is not really readable, but once you understand it it makes sense. Nonetheless there is a possibility to add separators, to make it more human readable:


```js
log.setTimeSeparator(':');

log.msg('test', 'this is a test log message'); // <16:58:31[test]> this is a test log message
log.err('database', 'authentication error');   // <16:58:31[database]> authentication error
```

The same is applicable for the filename using: `log.setDateSeparator(separator)`