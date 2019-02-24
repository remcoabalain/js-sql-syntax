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