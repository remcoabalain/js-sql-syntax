/**
 * Axel Boberg © 2019
 */

module.exports = {
  /**
   * Add the LEFT JOIN keyword
   * 
   * @param { String } table [UNESCAPED] The table to join, default to an empty string
   */
  'leftJoin': table => {
    return [`LEFT JOIN ${table || ''}`]
  },

  /**
   * Add the RIGHT JOIN keyword
   * 
   * @param { String } table [UNESCAPED] The table to join, default to an empty string
   */
  'rightJoin': table => {
    return [`RIGHT JOIN ${table || ''}`]
  },

  /**
   * Add the INNER JOIN keyword
   * 
   * @param { String } table [UNESCAPED] The table to join, default to an empty string
   */
  'innerJoin': table => {
    return [`INNER JOIN ${table || ''}`]
  }
}