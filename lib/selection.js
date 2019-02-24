/**
 * Axel Boberg © 2019
 */

module.exports = {
  /**
   * Add the FROM keyword
   * 
   * @param { String } table [UNESCAPED]
   */
  'from': table => {
    return [`FROM ${table}`]
  },

  /**
   * Add the WHERE keyword and generate
   * placeholders for values
   * 
   * @param { Object } query [UNESCAPED keys, ESCAPED values] Keys and values representing columns and data for populating the where-statement
   */
  'where': query => {
    let parts = [], values = []

    for (let [key, val] of Object.entries(query)) {
      parts.push(`AND ${key}=?`)
      values.push(val)
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
  'limit': n => {
    return [`LIMIT ?`, n]
  },

  /**
   * Add the OFFSET keyword
   * 
   * @param { Number } n [ESCAPED] A number representing the offset
   */
  'offset': n => {
    return [`OFFSET ?`, n]
  },

  /**
   * Add the AS keyword
   * 
   * @param { String } alias [UNESCAPED] An alias
   */
  'as': alias => {
    return [`AS ${alias}`]
  }
}