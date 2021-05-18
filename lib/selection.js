/**
 * @author Axel Boberg <hello@axelboberg.se>
 * @copyright Axel Boberg © 2021
 */

const JsSqlSyntaxError = require('./JsSqlSyntaxError')

module.exports = {
  /**
   * Add the FROM keyword
   *
   * @param { String } table [UNESCAPED]
   */
  from: table => {
    return [`FROM ${table}`]
  },

  /**
   * Add the WHERE keyword and generate
   * placeholders for values
   *
   * @param { Object } query [UNESCAPED keys, ESCAPED values] Keys and values representing columns and data for populating the where-statement
   */
  where: query => {
    const parts = []
    const values = []

    for (const [key, val] of Object.entries(query)) {
      let valArr = [val]

      if (Array.isArray(val)) {
        /*
        Allow values to be arrays,
        so that

        {
          key: [ 'a', 'b', 'c' ]
        }

        Becomes

        AND key IN (?, ?, ?)
        */
        const [inQuery, inValues] = module.exports.in(val)
        valArr = inValues
        parts.push(`AND ${key} ${inQuery}`)
      } else if (typeof val === 'object') {
        /*
        Allow queries with other
        operators such as

        {
          dateCol: { $lt: '2021-05-18' }
        }

        Becomes

        AND dateCol<?
        */
        const [op, _val] = Object.entries(val)[0]
        const operand = {
          $eq: '=',
          $gt: '>',
          $lt: '<',
          $gte: '>=',
          $lte: '<='
        }

        if (!operand[op]) {
          throw new JsSqlSyntaxError(`Invalid operand '${op}' in where clause`, 'ERR_WHERE_INVALID_OPERAND')
        }

        parts.push(`AND ${key}${operand[op]}?`)
        valArr = [_val]
      } else {
        /*
        The default case,
        use key as col
        and make it equal the value
        */
        parts.push(`AND ${key}=?`)
      }

      values.push(...valArr)
    }

    return [
      `WHERE 1=1 ${parts.join(' ')}`,
      values
    ]
  },

  /**
   * Add the LIMIT keyword
   *
   * @param { Number } n [ESCAPED] A number representing the limit
   */
  limit: n => {
    return ['LIMIT ?', n]
  },

  /**
   * Add the OFFSET keyword
   *
   * @param { Number } n [ESCAPED] A number representing the offset
   */
  offset: n => {
    return ['OFFSET ?', n]
  },

  /**
   * Add the AS keyword
   *
   * @param { String } alias [UNESCAPED] An alias
   */
  as: alias => {
    return [`AS ${alias}`]
  },

  /**
   * Add an IN clause
   *
   * @param { Array<String|Number> } vals [ESCAPED] Any values to be in the clause
   */
  in: vals => {
    const placeholders = vals
      .map(() => '?')
      .join(',')

    return [`IN (${placeholders})`, vals]
  }
}
