import { describe, expect, it } from 'vitest';
import { runScenario } from '../src/scenario';

describe('shared state contract', () => {
  it('reproduces deterministic shape and scale transitions', () => {
    expect(runScenario()).toEqual({ shape: 'sphere', scale: 1.5 });
  });
});
