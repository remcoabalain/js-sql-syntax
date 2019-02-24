const sql = require('../')

test('add and execute a custom function', () => {
  const query = sql()

  query.addCustomFunc('foo', () => {
    return [`FOO`]
  })
  expect(query.custom.foo().getQuery()).toBe('FOO')
})

test('add and execute a custom function followed by a default function', () => {
  const query = sql()

  query.addCustomFunc('foo', () => {
    return [`FOO`]
  })
  expect(query.custom.foo().select().getQuery()).toBe('FOO SELECT *')
})
