'use strict'

/*
 * adonis-vow
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const path = require('path')

async function copyVowFile (cli, appRoot, usesMigrations) {
  const filename = usesMigrations ? 'vowfile.migrations.js' : 'vowfile.js'
  try {
    await cli.copy(path.join(__dirname, `templates/${filename}`), path.join(appRoot, 'vowfile.js'))
    cli.command.completed('create', 'vowfile.js')
  } catch (error) {
    // ignore error
  }
}

async function copyExampleTestCase (cli, appRoot) {
  try {
    const template = await cli.command.readFile(path.join(__dirname, 'templates/unitTest.mustache'), 'utf-8')
    await cli.command.generateFile(path.join(appRoot, 'test/unit/example.spec.js'), template, { name: 'Example' })
    cli.command.completed('create', 'test/unit/example.spec.js')
  } catch (error) {
    // ignore error
  }
}

async function copyEnvFile (cli, appRoot) {
  try {
    await cli.copy(path.join(__dirname, 'templates/.env.testing'), path.join(appRoot, '.env.testing'))
    cli.command.completed('create', '.env.testing')
  } catch (error) {
    // ignore error
  }
}

module.exports = async (cli) => {
  const appRoot = cli.helpers.appRoot()
  const usesMigrations = await cli.command.confirm('Run database migrations for testing (change in vowfile.js)')

  await copyVowFile(cli, appRoot, usesMigrations)
  await copyExampleTestCase(cli, appRoot)
  await copyEnvFile(cli, appRoot)
}
