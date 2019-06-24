const sql = require('../')

test('select *', () => {
  expect(sql().select().getQuery()).toBe('SELECT *')
})

test('select columns', () => {
  expect(sql().select(['foo', 'bar', 'baz']).getQuery()).toBe('SELECT foo, bar, baz')
})

test('update', () => {
  expect(sql().update('foo').getQuery()).toBe('UPDATE foo')
})

test('insert', () => {
  expect(sql().insert().getQuery()).toBe('INSERT')
})

test('delete', () => {
  expect(sql().delete().getQuery()).toBe('DELETE')
})

test('in', () => {
  expect(sql().in(['foo', 'bar']).getQuery()).toBe('IN (?,?)')
})

test('where', () => {
  expect(sql().where({ foo: 'bar', baz: 'qux' }).getQuery()).toBe('WHERE 1=1 AND foo=? AND baz=?')
})

test('where in', () => {
  expect(sql().where({ foo: ['bar', 'baz', 'qux'] }).getQuery()).toBe('WHERE 1=1 AND foo IN (?,?,?)')
})