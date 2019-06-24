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
      let valArr = [ val ]

      /**
       * Check if value is array and
       * in that case add an IN-clause
       */
      if (Array.isArray(val)) {
        const [ inQuery, inValues ] = module.exports.in(val)
        valArr = inValues
        parts.push(`AND ${key} ${inQuery}`)
      } else {
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
  },

  /**
   * Add an IN clause
   * 
   * @param { Array<String|Number> } vals [ESCAPED] Any values to be in the clause
   */
  'in': vals => {
    const placeholders = vals
      .map(() => `?`)
      .join(',')

    return [`IN (${placeholders})`, vals]
  }
}