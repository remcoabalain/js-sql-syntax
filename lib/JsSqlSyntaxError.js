/**
 * @author Axel Boberg <hello@axelboberg.se>
 * @copyright Axel Boberg © 2021
 */

class JsSqlSyntaxError extends Error {
  constructor (msg, code) {
    super(msg)
    this.name = 'JsSqlSyntaxError'
    this.code = code
  }
}

module.exports = JsSqlSyntaxError
