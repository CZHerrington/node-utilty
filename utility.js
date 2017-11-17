#! /usr/bin/env node

//imports
    commander = require('commander');
    cmd       = require('node-cmd');
    Logger    = require('./logger')

// init
const logger  = new Logger('utility')
var _errCount = 0;
var user;
var pwd;
var id;

function getBranch(){
        cmd.get("git status | grep branch | awk '{print $3;exit}';",
            function(err,data,stderr){
                if (err){
                    logger.error(stderr)
                }else if(!err){
                    logger.ok({
                        msg:'in git repository...', data:'True\n'});
                    logger.ok({
                        msg:'on branch...........',data:data});
                }else{
                    logger.warn({
                        name: 'Switch fell through', desc: `${err,data,stderr}`});
                }
            }
        )
    };

// get present working directory
cmd.get(
    'pwd',
    function(err, data, stderr){
        pwd = data;
        err ? logger.error(err, stderr) : logger.ok({msg:'current directory...', data:data})
    }
);

// get process owner
cmd.get(
    'id -un',
    function(err, data, stderr){
        id = data;
        err ? logger.error(err, stderr) : logger.ok({msg:'current user........', data:data})
    }
);

//get current charge
//TODO add conditional to only display this when not fully charged
cmd.get(
    `ioreg -l | grep -i capacity | tr '\n' ' | ' | awk '{printf("%.2f%%", $10/$5 * 100)}';`,
    function(err, data, stderr) {
        err ? logger.error(err, stderr) : logger.ok({msg:'current charge......', data:`${data}\n`})
    }
);

// get Git branch name
cmd.get(
    'git status',
    function(err,data,stderr){
        if (err) {
            logger.warn({
                'name':'git status:','desc':'Not a git repository!'
            })
        } else {
            getBranch()
        };
    }
);