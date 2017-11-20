#! /usr/bin/env node

/*TO DO: Set up definition files and change logger 'warn' and 'ok' to accept 'message' objects
like this:

         let message = {
            msg: "current user........",
            data: data
        } */

//imports
let commander = require('commander');
let cmd = require('node-cmd');
import Logger from './logger';

var pwd;
var id;

// init


const logger = new Logger('utility');

function getBranch(){
        cmd.get("git status | grep branch | awk '{print $3;exit}';",
            function(err:string, data:string, stderr:string){
                if (err){
                    logger.error(err,stderr)
                }else if(!err) {
                    logger.ok({msg:'in git repository...', data:'True\n'});
                    logger.ok({msg:'on branch...........',data:data});
                }else logger.warn({name: 'Switch fell through', desc: 'getBranch() conditional failed'});
            }
        )
    };

// get present working directory
cmd.get(
    'pwd',
    function(err:string, data:string, stderr:string){
        pwd = data;
        err ? logger.error(err, stderr) : logger.ok({
            msg:'current directory...', data:data
        })
    }
);

// get process owner
cmd.get(
    'id -un',
    function(err:string, data:string, stderr:string){
        id = data;
        err ? logger.error(err, stderr) : logger.ok({
            msg:'current user........', data:data
        })
    }
);

//get current charge
//TODO add conditional to only display this when not fully charged
cmd.get(
    `ioreg -l | grep -i capacity | tr '\n' ' | ' | awk '{printf("%.2f%%", $10/$5 * 100)}';`,
    function(err:string, data:string, stderr:string){
        err ? logger.error(err, stderr) : logger.ok({msg:'current charge......', data:`${data}\n`})
    }
);

// get Git branch name
cmd.get(
    'git status',
    function(err:string, data:string, stderr:string){
        if (err) logger.warn({
            'name':'git status:','desc':'Not a git repository!'
        })
        else getBranch();
    }
);