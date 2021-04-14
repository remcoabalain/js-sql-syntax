const sql = require('../')

test('raw', () => {
  expect(sql().raw('AND foo >= ?').getQuery()).toBe('AND foo >= ?')
})

test('on duplicate key update', () => {
  expect(sql().onDuplicateKeyUpdate({ foo: 'bar' }).getQuery()).toBe('ON DUPLICATE KEY UPDATE `foo`=?')
})