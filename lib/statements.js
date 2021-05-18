/**
 * @author Axel Boberg <hello@axelboberg.se>
 * @copyright Axel Boberg © 2021
 */

module.exports = {
  /**
   * Add the SELECT keyword
   * followed by a list of columns
   * to include or *
   *
   * @param { Array<String>? } cols [UNESCAPED] A list of column-names
   */
  select: cols => {
    let _cols = '*'
    if (cols) {
      _cols = cols.join(', ')
    }
    return [`SELECT ${_cols}`]
  },

  /**
   * Add the INSERT keyword
   */
  insert: () => {
    return ['INSERT']
  },

  /**
   * Add the UPDATE keyword followed
   * by an optional table-name
   *
   * @param { String? } table [UNESCAPED] The name of the table to update
   */
  update: (table = '') => {
    return [`UPDATE ${table}`]
  },

  /**
   * Add the DELETE keyword
   */
  delete: () => {
    return ['DELETE']
  }
}
