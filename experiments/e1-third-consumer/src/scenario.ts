import { initialState, transition } from '../../../packages/agis-state-contract/src/index';

export function runScenario() {
  return transition(transition(initialState, { type: 'TOGGLE_SHAPE' }), { type: 'TOGGLE_SCALE' });
}
