import { CodObjectPipe } from './cod-object.pipe';

describe('CodObjectPipe', () => {
  const pipe = new CodObjectPipe();

  it('returns a number input as-is', () => {
    expect(pipe.transform(42)).toBe(42);
  });

  it('returns a numeric string input as a number', () => {
    expect(pipe.transform('42' as any)).toBe(42);
  });

  it('extracts Close by default from a candle object', () => {
    expect(pipe.transform({ type: 'candle', Open: 10, Close: 15, High: 18, Low: 9 })).toBe(15);
  });

  it('extracts the default level field for level objects', () => {
    expect(pipe.transform({ type: 'level', level: 12.5 })).toBe(12.5);
  });

  it('extracts Close for candle-like objects without a type', () => {
    expect(pipe.transform({ Open: 10, Close: 15, High: 18, Low: 9 })).toBe(15);
  });

  it('extracts the default r2 field for regression objects', () => {
    expect(pipe.transform({ type: 'regression', Close: { r2: 0.91 } })).toBe(0.91);
  });

  it('extracts a custom field override when provided', () => {
    expect(pipe.transform({ type: 'candle', Open: 10, Close: 15, High: 18, Low: 9 }, 'Volume')).toBeNull();
    expect(pipe.transform({ type: 'candle', Open: 10, Close: 15, High: 18, Low: 9 }, 'High')).toBe(18);
  });

  it('returns null when no default field exists for the object type', () => {
    expect(pipe.transform({ type: 'unknown', value: 7 })).toBeNull();
  });
});
