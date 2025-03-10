import { weatherPlugin } from './plugin';

describe('weather', () => {
  it('should export plugin', () => {
    expect(weatherPlugin).toBeDefined();
  });
});
