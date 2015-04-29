module.exports =  (function() {
    "use strict";
    
    /**
     * Constructor
     *
     * Get access to  the filesystem.
     * Setting the paths for the msg and err logs.
     */
    function logger(msgPath, errPath) {
        
        logger.msgPath = msgPath;
        logger.errPath = errPath;
        
        if (logger.msgPath === undefined) { logger.msgPath = './'; }
        if (logger.errPath === undefined) { logger.errPath = './'; }
        
        logger.ts = '';
        logger.ds = '';
        
        logger.short = false;
        
        logger.fs = require('fs');
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    // :: PRIVATE FUNCTIONS
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    
    /**
     * Get the current date in [yyyy-mm-dd]
     * @return {string} [current date]
     */
    logger.getDate = function(){
        var mt = logger.dt.getMonth() + 1;
        var dd = logger.dt.getDate();
        return  logger.dt.getFullYear().toString().slice(2) + logger.ds +
                (mt < 10 ? '0' + mt:mt) + logger.ds + (dd < 10 ? '0' + dd:dd);
    };
    
    /**
     * Get the current time in [hh:mm:ss] format.
     * @return {string} [current time]
     */
    logger.getTime = function(){
        var hh = logger.dt.getHours();
        var mn = logger.dt.getMinutes();
        var ss = logger.dt.getSeconds();
        return  (hh < 10 ? '0' + hh:hh).toString() + logger.ts +
                (mn < 10 ? '0' + mn:mn).toString() + logger.ts +
                (ss < 10 ? '0' + ss:ss).toString() ;
    };
    
    logger.format = function(type, data) {
        var time = logger.getTime();
        if (logger.short) {
            return "<" + time + "> " + type + "\n";
        } else {
            return "<" + time + "[" + type + "]> " + data + "\n";
        }
    };
    
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    // :: PUBLIC FUNCTIONS
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    
    logger.prototype.useShortLog = function(logType) {
        if (logType === undefined) { logType = true; }    
        logger.short = logType;
    };
    
    /**
     * Set the sepatarion style for the Time string.
     * @param {string} ts
     */
    logger.prototype.setTimeSeparator = function(ts) {
        logger.ts = ts;
    };
    
    /**
     * Set the sepatarion style for the Date string.
     * @param {string} ds
     */
    logger.prototype.setDateSeparator = function(ds) {
        logger.ds = ds;
    };
    
    /**
     * Log something in the ".log" file
     * @param  {string} type
     * @param  {string} data
     * @return {void}
     */
    logger.prototype.msg = function(type, data) {
        logger.dt = new Date();
        
        // use {'flags': 'a'} to append 
        // and {'flags': 'w'} to erase and write a new file
        logger.msg = logger.fs.createWriteStream(logger.msgPath + '/' + logger.getDate() + '.log', {
            'flags': 'a'
        });
        
        logger.msg.on('error', function (error) {
            console.log("Caught", error);
            if (error.code == 'ENOENT') {
                console.log('Hint: folder doesn\'t exist'); }
        });
        
        logger.msg.end(logger.format(type, data));
    };
    
    /**
     * Log something in the ".err" file
     * @param  {string} type
     * @param  {string} data
     * @return {void}
     */
    logger.prototype.err = function(type, data) {
        logger.dt = new Date();
        
        logger.err = logger.fs.createWriteStream(logger.errPath + '/' + logger.getDate() + '.err', {
            'flags': 'a'
        });        
        logger.err.on('error', function (error) {
            console.log("Caught", error);
            if (error.code == 'ENOENT') {
                console.log('Hint: folder doesn\'t exist'); }
        });
        
        logger.err.end(logger.format(type, data));
    };
    
    return logger;
    
}());
