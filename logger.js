chalk   = require('chalk');
let log = console.log;

// Define internal logging utilities
    function _error(err /* [err_1, error_2, ..error_n] */){
        let  _errCount = 0
        Array.prototype.slice.call(arguments).forEach(
            function(error){
                _errCount += 1
               log(chalk.red.bold(`ERROR! [${_errCount}] `) + chalk(`${error}`))
            });
   };

    function _ok (info /* { msg: 'message', data: 'data' } */){
        info.data = info.data == undefined ? 'none' : info.data;
       log(
           chalk.green.bold('OK ') + chalk.dim(`${info.msg}`) + chalk.bold(`${info.data}`)
       );
   };

   function _warn(info /* {name:'name', desc: 'description'} */){
       log(
           chalk.yellow.bold('WARN! ') + `${info.name} ${info.desc}\n`
       );
   };

   function _tester(){

};

// export Logger class
module.exports = class Logger {
    constructor(msg){
        this.error = _error;
        this.ok    = _ok;
        this.warn  = _warn;

        log('Logger instance ' + chalk.white.bold.italic(`${msg}`) + ' initializing..')

        log('logger_error ' + chalk.green('loaded'))
        log('logger_warn ' + chalk.green('loaded'))
        log('logger_ok ' + chalk.green('loaded\n'))
    };
};