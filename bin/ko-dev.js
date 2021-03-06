#! /usr/bin/env node
'use strict';

// set NODE_ENV to development
const { DEV } = require('../constants/env');
process.env.NODE_ENV = DEV;

const colors = require('colors');
const { program, attachOptions } = require('../util/program');
const { inProcess } = require('../util/stdout');
const dev = require('../script/dev');

program
  .option('-p, --port <port>', 'server start on which port', parseInt)
  .option('--host <host>', 'specify a host to use')
  .option('-t, --ts', 'support typescript')
  .option('-a,--analyzer', 'support building analyzer')
  .parse(process.argv);

attachOptions(program);

try {
  const inProcessConf = {
    initStr: 'ko dev server start!',
    spinStr: 'compiling...',
    process: dev,
  };
  inProcess(inProcessConf);
} catch (ex) {
  console.log(colors.red('process init failed:'), ex);
}
