#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chalk = require('chalk');

const gitRoot = execSync('git rev-parse --show-toplevel').toString('utf-8').trim();
const gitPath = path.join(gitRoot, '.git');

const mergeMsgPath = path.join(gitPath, 'MERGE_MSG');

if (fs.existsSync(mergeMsgPath)) {
  process.exit(0);
}

const commitMsgPath = path.join(gitPath, 'COMMIT_EDITMSG');
const commitMessage = fs.readFileSync(commitMsgPath, 'utf8');

let branchName = execSync('git rev-parse --abbrev-ref HEAD').toString('utf8').trim();

if (commitMessage.startsWith(branchName)) {
  process.exit(0);
}

/**
 * This script doesn`t handle detached HEAD case
 * Be careful
 */

if (!/[A-Z]+-\d+.*/.test(branchName)) {
  console.log(chalk.red('Invalid branch name. Skipped'));
  process.exit(0);
}

if (!/[A-Z]{2,5}-[0-9]{1,9}/.test(branchName)) {
  console.log(chalk.red('Invalid branch name. Skipped'));
  process.exit(0);
} else {
  branchName = branchName.match(/[A-Z]{2,5}-[0-9]{1,9}/)[0];
}

fs.writeFileSync(commitMsgPath, `${branchName}: ${commitMessage}`, 'utf8');
