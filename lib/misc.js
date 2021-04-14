/**
 * Axel Boberg © 2019
 */

module.exports = {
  /**
   * Add a subquery
   * 
   * @param { SQL } query A subquery
   */
  'subquery': query => {
    return [`(${query.getQuery()})`, query.getValues()]
  },

  /**
   * Add the INTO keyword
   * 
   * @param { String } table [UNESCAPED]
   */  
  'into': table => {
    return [`INTO ${table}`]
  },

  /**
   * Add the ON keyword
   * 
   * @param { String } col [UNESCAPED]
   * @param { String|Number } val [UNESCAPED] 
   */
  'on': (col, val) => {
    return [`ON ${col}=${val}`]
  },

  /**
   * Add the AND keyword
   * 
   * @param { String } col [UNESCAPED]
   * @param { String|Number } val [ESCAPED]
   */
  'and': (col, val) => {
    return [`AND ${col}=?`, [val]]
  },

  /**
   * Add the SET keyword and
   * generate placeholders for data
   * 
   * @param { Object } data [UNESCAPED keys, ESCAPED values]
   */
  'set': data => {
    let cols = Object.keys(data)
      .map(col => { return `${col}=?` })
      .join(', ')

    return [`SET ${cols}`, Object.values(data)]
  },

  /**
   * Add the ON DUPLICATE KEY UPDATE keyword
   * and generate placeholders for data to set
   * 
   * @param { Object } data [UNESCAPED keys, ESCAPED values]
   */
  'onDuplicateKeyUpdate': data => {
    let cols = Object.keys(data)
      .map(col => { return `\`${col}\`=?` })
      .join(', ')

    return [`ON DUPLICATE KEY UPDATE ${cols}`, Object.values(data)]
  },

  /**
   * Add raw SQL to the query
   * 
   * @param { String } sql An SQL string
   * @param { Array } values [ESCAPED] Values
   */
  'raw': (sql, values) => {
    return [ sql, values ]
  }
}