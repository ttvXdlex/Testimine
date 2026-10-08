const { restock, pick, findDuplicateSkus } = require('./inventory');

// ============================================================================
// 1. Functional Tests (Etapp 1a: REQ-01 .. REQ-05)
// ============================================================================

// functional
test('REQ-01 restock adds quantity to existing sku', () => {
  const stock = { 'A-1': 5 };
  const updated = restock(stock, [{ sku: 'A-1', qty: 3 }]);
  expect(updated).toEqual({ 'A-1': 8 });
});

// functional
test('REQ-01 restock adds unknown sku to stock', () => {
  const stock = { 'A-1': 5 };
  const updated = restock(stock, [{ sku: 'B-2', qty: 4 }]);
  expect(updated).toEqual({ 'A-1': 5, 'B-2': 4 });
});

// functional
test('REQ-01 restock processes multiple deliveries correctly', () => {
  const stock = { 'A-1': 5 };
  const updated = restock(stock, [
    { sku: 'A-1', qty: 2 },
    { sku: 'B-2', qty: 10 },
    { sku: 'A-1', qty: 3 },
  ]);
  expect(updated).toEqual({ 'A-1': 10, 'B-2': 10 });
});

// functional
test('REQ-02 restock returns a new object, original unchanged', () => {
  const stock = { 'A-1': 5 };
  const result = restock(stock, [{ sku: 'A-1', qty: 3 }]);
  expect(stock['A-1']).toBe(5);
  expect(result).not.toBe(stock);
});

// functional
test('REQ-03 restock throws on qty 0', () => {
  expect(() => restock({ 'A-1': 5 }, [{ sku: 'A-1', qty: 0 }])).toThrow(
    'qty must be a positive whole number'
  );
});

// functional
test('REQ-03 restock throws on negative qty', () => {
  expect(() => restock({ 'A-1': 5 }, [{ sku: 'A-1', qty: -1 }])).toThrow(
    'qty must be a positive whole number'
  );
});

// functional
test('REQ-03 restock throws on non-integer qty', () => {
  expect(() => restock({ 'A-1': 5 }, [{ sku: 'A-1', qty: 2.5 }])).toThrow(
    'qty must be a positive whole number'
  );
});

// functional
test('REQ-03 restock accepts positive boundary qty 1', () => {
  const stock = { 'A-1': 5 };
  const result = restock(stock, [{ sku: 'A-1', qty: 1 }]);
  expect(result['A-1']).toBe(6);
});

// functional
test('REQ-04 pick reduces quantity on valid input', () => {
  const stock = { 'A-1': 5, 'B-2': 10 };
  const result = pick(stock, 'A-1', 2);
  expect(result).toEqual({ 'A-1': 3, 'B-2': 10 });
});

// functional
test('REQ-04 pick returns a new object, original unchanged', () => {
  const stock = { 'A-1': 5 };
  const result = pick(stock, 'A-1', 2);
  expect(stock['A-1']).toBe(5);
  expect(result).not.toBe(stock);
});

// functional
test('REQ-04 pick throws on unknown sku', () => {
  const stock = { 'A-1': 5 };
  expect(() => pick(stock, 'C-3', 1)).toThrow('unknown sku');
});

// functional
test('REQ-04 pick throws when qty > available stock', () => {
  const stock = { 'A-1': 5 };
  expect(() => pick(stock, 'A-1', 6)).toThrow('not enough stock');
});

// functional
test('REQ-04 pick throws on invalid qty (0, negative, non-integer)', () => {
  const stock = { 'A-1': 5 };
  expect(() => pick(stock, 'A-1', 0)).toThrow('not enough stock');
  expect(() => pick(stock, 'A-1', -1)).toThrow('not enough stock');
  expect(() => pick(stock, 'A-1', 1.5)).toThrow('not enough stock');
});

// functional
test('REQ-05 findDuplicateSkus returns each duplicate sku once', () => {
  const items = [
    { sku: 'A-1' },
    { sku: 'B-2' },
    { sku: 'A-1' },
    { sku: 'C-3' },
    { sku: 'B-2' },
    { sku: 'B-2' },
  ];
  const duplicates = findDuplicateSkus(items);
  expect(duplicates.sort()).toEqual(['A-1', 'B-2'].sort());
});

// functional
test('REQ-05 findDuplicateSkus returns empty array when no duplicates exist', () => {
  const items = [{ sku: 'A-1' }, { sku: 'B-2' }, { sku: 'C-3' }];
  expect(findDuplicateSkus(items)).toEqual([]);
});

// functional
test('REQ-05 findDuplicateSkus returns empty array for empty items list', () => {
  expect(findDuplicateSkus([])).toEqual([]);
});


// ============================================================================
// 2. Performance Tests (Etapp 1b: REQ-06)
// ============================================================================

// performance
test('REQ-06 findDuplicateSkus handles 20 000 items under 100 ms', () => {
  const items = [];
  for (let i = 0; i < 20000; i++) items.push({ sku: 'SKU-' + (i % 19000) });
  const t0 = performance.now();
  findDuplicateSkus(items);
  const ms = performance.now() - t0;
  expect(ms).toBeLessThan(100);
});


// ============================================================================
// 3. Security Tests (Etapp 1c: REQ-07)
// ============================================================================

// security
test.each([
  ['<script>alert(1)</script>', 'HTML injection'],
  ['A'.repeat(21), 'too long (21 chars)'],
  ['SKU 1', 'space in sku'],
  [123, 'not a string (number)'],
  ['', 'empty string'],
  ["'; DROP TABLE stock; --", 'SQL injection'],
  ['sku$invalid!', 'special characters'],
])('REQ-07 rejects sku %j (%s)', (sku) => {
  expect(() => restock({}, [{ sku, qty: 1 }])).toThrow('invalid sku');
  expect(() => pick({ [sku]: 5 }, sku, 1)).toThrow('invalid sku');
});

// security
test('REQ-07 accepts valid boundary skus (1 to 20 chars, letters, digits, dash)', () => {
  const validSkus = ['A', '1', '-', 'A-1', 'SKU-100-XYZ', 'A'.repeat(20)];
  for (const sku of validSkus) {
    const stock = restock({}, [{ sku, qty: 5 }]);
    expect(stock[sku]).toBe(5);
    const picked = pick(stock, sku, 2);
    expect(picked[sku]).toBe(3);
  }
});


// ============================================================================
// 4. Reliability & Regression Tests (Etapp 1c & 1d: REQ-08)
// ============================================================================

// reliability
test('REQ-08 failed restock leaves original stock unchanged', () => {
  const stock = { 'A-1': 5 };
  expect(() =>
    restock(stock, [
      { sku: 'A-1', qty: 1 },
      { sku: 'B-2', qty: 0 },
    ])
  ).toThrow();
  expect(stock['A-1']).toBe(5);
});

// reliability
test('REQ-08 failed pick leaves original stock unchanged', () => {
  const stock = { 'A-1': 5 };
  expect(() => pick(stock, 'A-1', 10)).toThrow();
  expect(stock['A-1']).toBe(5);

  expect(() => pick(stock, 'A-1', 0)).toThrow();
  expect(stock['A-1']).toBe(5);
});
