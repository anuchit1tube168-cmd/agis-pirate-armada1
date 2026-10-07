import { describe, expect, it } from 'vitest';
import { runIndependentScenario } from '../src/scenario';

describe('independent reuse scenario', () => {
  it('reuses the validated transition boundary without renderer or DOM dependencies', () => {
    expect(runIndependentScenario()).toEqual({ shape: 'sphere', scale: 1.5 });
  });
});
