/**
 * Axel Boberg © 2019
 */

const functions = {
  ...require('./lib/statements'),
  ...require('./lib/values'),
  ...require('./lib/selection'),
  ...require('./lib/ordering'),
  ...require('./lib/joins'),
  ...require('./lib/misc')
}

function SQL () {
  let query = []
  let values = []

  this.custom = {}

  /**
   * Add a function to an object/instace
   * 
   * @param { Object } target The target object on which to attach the function
   * @param { String } key The name of the function
   * @param { Function } func The function to add 
   * @param { Object } ctx The context to bind to the function as well as its return-value
   */
  function addFunc (target, key, func, ctx) {
    target[key] = function (...args) {
      let [sql, vals] = func(...args)

      if (!vals) vals = []
      if (!Array.isArray(vals)) vals = [ vals ]

      query.push(sql)
      values.push(...vals)

      return ctx
    }.bind(ctx)
  }

  /**
   * Register all SQL-methods
   */
  for (let [key, func] of Object.entries(functions)) {
    addFunc(this, key, func, this)
  }

  this.getQuery = () => {
    return query.join(' ')
  }

  this.getValues = () => {
    return values
  }

  /**
   * Add a custom SQL-method
   */
  this.addCustomFunc = (name, func) => {
    if (typeof name !== 'string') {
      throw new TypeError('name must be a string')
    }
    
    if (typeof func !== 'function') {
      throw new TypeError('func must be a function')
    }

    addFunc(this.custom, name, func, this)
  }
}

module.exports = () => { return new SQL() }