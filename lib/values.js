/**
 * @author Axel Boberg <hello@axelboberg.se>
 * @copyright Axel Boberg © 2021
 */

module.exports = {
  /**
   * SQL: VALUES
   * @param { Object } data [UNESCAPED keys, ESCAPED values]
   *//**
   * SQL: VALUES
   * @param { Array<Object> } data [UNESCAPED keys, ESCAPED values]
   */
  values: data => {
    let items = [data]
    if (Array.isArray(data)) {
      items = data
    }

    const keys = Object.keys(items[0])
      .map(key => `\`${key}\``)

    const flatValues = items
      .map(item => {
        return Object.values(item)
      })
      .reduce((pre, cur) => pre.concat(cur), [])

    const placeholders = items
      .map(item => {
        const num = Object.keys(item).length
        return `(${new Array(num).fill('?').join(',')})`
      })
      .join(',')

    return [
      `(${keys.join(',')}) VALUES ${placeholders}`,
      flatValues
    ]
  }
}
