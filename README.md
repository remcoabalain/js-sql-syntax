# JS-SQL-SYNTAX

## Example usage
```javascript
const sql = require('js-sql-syntax')

const syntax = sql().select(['col1', 'col2']).from('myTable').where({'col1': '1'})

const query = syntax.getQuery()
// SELECT col1, col2 FROM myTable WHERE 1=1 AND col1=?

const values = syntax.getValues()
// ['1']
```

## API

#### `sql()`  
Returns a new SQL instance

#### `.getQuery()`  
Returns the generated SQL query as a string from an instance

#### `.getValues()`  
Returns an array of values matching the order of placeholders in the query

#### `.addCustomFunc(name, func)`  
Add a custom function  

```javascript
const query = sql()
query.addCustomFunc('foo', (arg1, arg2) => {
  /**
   * The function can take any arguments
   */

  /**
   * Should return an array where the first value (required)
   * is the generated SQL-string and the second value (optional)
   * is an array of values
   */
  return ['FOO', ['val1', 'val2']]
})

// Call your custom function like this
query.custom.foo(arg1, arg2)

// Chaining is still supported, with or without default functions
query.custom.foo(arg1, arg2).select().from('myTable')
```

### SQL functions

#### `.select([cols])`  
`cols` *Unescaped* An array of strings representing columns to select, defaults to `*`  
**Renders:** `SELECT *`

#### `.insert()`  
**Renders:** `INSERT`

#### `.update([table])`  
`table` *Unescaped* The name of the table to update as a string  
**Renders:** `UPDATE table`

#### `.delete()`  
**Renders:** `DELETE`

#### `.from(table)` 
`table` *Unescaped* A tablename as a string  
**Renders:** `FROM table`

#### `.where(query)`  
`query` *Unescaped keys, escaped values* An object where key-value pairs renders patterns.  
**Renders:** `WHERE 1=1 AND foo=?`

#### `.values(values)`  
`values` *Unescaped keys, escaped values* An object or array of objects where keys will translate to columns.  
```javascript
const values = [{
  'col1': 'val1',
  'col2': 'val2'
},{
  'col1': 'val3',
  'col2': 'val4'
}]

sql().values(values)
// (col1,col2) VALUES (?,?),(?,?)
```
**Renders (single object):** `(col1,col2) VALUES (?,?)`  
**Renders (array of objects):** `(col1,col2) VALUES (?,?),(?,?)`

#### `.into(table)`  
`table` *Unescaped* The name of a table as a string  
**Renders:** `INTO table`

#### `.set(data)`  
`data` *Unescaped keys, escaped values* An object where keys will translate to columns  
**Renders:** `SET col1=?, col2=?`

#### `.on(col, val)`  
`col` *Unescaped* The name of a column as a string  
`val` *Unescaped* A value, will be cast to a string  

TODO: Add option to escape values  

**Renders:** `ON col=val`

#### `.and(col, val)`  
`col` *Unescaped* The name of a column as a string  
`val` *Escaped* A value as any type supported by the database connection  

TODO: Add option to leave values unescaped  

**Renders:** `AND col=?`

#### `.subquery(query)`  
`query` Another SQL-query instance, values will be appended to the primary query  
**Renders:** `( The query provided by query.getQuery() within parentheses )`

#### `.leftJoin([table])`  
`table` *Unescaped* The name of the table to join as a string, defaults to an empty string  
**Renders:** `LEFT JOIN table`

#### `.rightJoin([table])`  
`table` *Unescaped* The name of the table to join as a string, defaults to an empty string  
**Renders:** `RIGHT JOIN table`

#### `.innerJoin([table])`  
`table` *Unescaped* The name of the table to join as a string, defaults to an empty string  
**Renders:** `INNER JOIN table`

#### `.limit(n)`  
`n` *Escaped* The limit as an integer  
**Renders:** `LIMIT ?`

#### `.offset(n)`  
`n` *Escaped* The offset as an integer  
**Renders:** `OFFSET ?`

#### `.as(alias)`  
`alias` *Unescaped* An alias as a string  
**Renders:** `AS alias`

#### `.orderBy(col)`  
`col` *Unescaped* The column to order by as a string  
**Renders:** `ORDER BY col`

#### `.groupBy(col)`  
`col` *Unescaped* The column to group by as a string  
**Renders:** `GROUP BY col`

#### `.descending()`  
**Renders:** `DESC`

#### `.ascending()`  
**Renders:** `ASC`

#### `.onDuplicateKeyUpdate(data)`  
`data` *Unescaped keys, escaped values* An object where keys translate to columns  
**Renders:** `ON DUPLICATE KEY UPDATE col1=?, col2=?`

#### `.raw(sql, values)`  
`sql` *Unescaped* A string with SQL code  
`values` *Escaped* An array of values to push to the prepared statement    
**Renders:** The sql string