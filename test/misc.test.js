const sql = require('../')

test('raw', () => {
  expect(sql().raw('AND foo >= ?').getQuery()).toBe('AND foo >= ?')
})