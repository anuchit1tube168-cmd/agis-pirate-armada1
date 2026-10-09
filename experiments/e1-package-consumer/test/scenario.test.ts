import { describe, expect, it } from 'vitest';
import { runPackageScenario } from '../src/scenario.js';

describe('package-boundary reuse', () => {
  it('reuses deterministic state contract through package resolution', () => {
    expect(runPackageScenario()).toEqual({ shape: 'sphere', scale: 1.5 });
  });
});
