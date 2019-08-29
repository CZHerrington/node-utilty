// TO DO: Refactor into typescript
import chalk from 'chalk';

// export Logger class
export default class Logger {

    constructor(readonly title: string){
        this.title = title;
        // replace with true init fxns
        this.log('logger_error ' + chalk.green('loaded'))
        this.log('logger_warn ' + chalk.green('loaded'))
        this.log('logger_ok ' + chalk.green('loaded\n'))
        this.log('Logger instance ' + chalk.white.bold.italic(`${title}`) + ' initializing..')
    };
    
    private _log = function (message: string){
        console.log(`${this.title}>`, message)
    };

    private _error = function (...err: any[]){
        let  _errCount = 0
        Array.prototype.slice.call(arguments).forEach(
            (error:string) => {
                _errCount += 1
                this.log(chalk.red.bold(`ERROR! [${_errCount}] `) + chalk(`${error}`))
            });
    };

    private _ok = function (info: {data:string, msg:string} /* { msg: 'message', data: 'data' } */){
        info.data = info.data == undefined ? 'none' : info.data;
        this.log(
            chalk.green.bold('OK ') + chalk.dim(`${info.msg}`) + chalk.bold(`${info.data}`)
        );
    };

    private _warn = function (info: {name:string, desc:string} /* {name:'name', desc: 'description'} */){
        this.log(
            chalk.yellow.bold('WARN! ') + `${info.name} ${info.desc}\n`
        );
    };

    // expose internal functions (Refactor code so that this is useful and not simply following a convention)
    public error = this._error;
    public ok    = this._ok;
    public warn  = this._warn;
    public log   = this._log;
    
};
