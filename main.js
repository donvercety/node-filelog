var logger = require('./mylogger');
    log = new logger();

log.setTimeSeparator(':');

log.msg('test', 'this is a test log message'); // <163751[test]> this is a test log message

log.err('database', 'authentication error');   // <163751[database]> authentication error