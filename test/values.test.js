const sql = require('../')

test('single values', () => {
  expect(sql().values({foo: 'bar'}).getQuery()).toBe('(`foo`) VALUES (?)')
})

test('nested values', () => {
  expect(sql().values([{foo: 'bar'}, {'foo': 'baz'}]).getQuery()).toBe('(`foo`) VALUES (?),(?)')
})

test('multiple nested values', () => {
  expect(sql().values([{foo: 'bar', baz: 'qux'}, {foo: 'bar', baz: 'qux'}]).getQuery()).toBe('(`foo`,`baz`) VALUES (?,?),(?,?)')
})

test('flatten nested values', () => {
  expect(sql().values([{foo: 'bar', baz: 'qux'}, {foo: 'bar', baz: 'corge'}]).getValues()).toEqual(['bar', 'qux', 'bar', 'corge'])
})