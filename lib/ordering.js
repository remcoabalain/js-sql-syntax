/**
 * @author Axel Boberg <hello@axelboberg.se>
 * @copyright Axel Boberg © 2021
 */

module.exports = {
  /**
   * Add the ORDER BY keyword
   *
   * @param { String } col [UNESCAPED] A column-name to order by
   */
  orderBy: col => {
    return [`ORDER BY ${col}`]
  },

  /**
   * Add the GROUP BY keyword
   *
   * @param { String } col [UNESCAPED] A column-name to group by
   */
  groupBy: col => {
    return [`GROUP BY ${col}`]
  },

  /**
   * Add the DESC keyword
   */
  descending: () => {
    return ['DESC']
  },

  /**
   * Add the ASC keyword
   */
  ascending: () => {
    return ['ASC']
  }
}
