import { hello } from '../src/index';

describe('hello', () => {
  it('should return "Hello, world!"', () => {
    expect(hello()).toBe('Hello, world!');
  });
});
