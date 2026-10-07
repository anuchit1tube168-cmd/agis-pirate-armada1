import { initialState, transition, type AppState } from '../../e1-3d-staging/src/state';

export function runIndependentScenario(): AppState {
  const afterShape = transition(initialState, { type: 'TOGGLE_SHAPE' });
  return transition(afterShape, { type: 'TOGGLE_SCALE' });
}
