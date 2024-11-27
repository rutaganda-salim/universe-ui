#!/usr/bin/env node
import { Command } from 'commander'
import packageJson from '../package.json'
import { add } from '~/src/commands/add'
import { diff } from '~/src/commands/diff'
import { init } from '~/src/commands/init'
import { template } from '~/src/commands/template'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
   const program = new Command()
      .name('nyxb')
      .description('add components and dependencies to your project')
      .version(
         packageJson.version || '1.0.0',
         '-v, --version',
         'display the version number',
      )

   program.addCommand(init).addCommand(add).addCommand(diff).addCommand(template)

   program.parse()
}

main()
