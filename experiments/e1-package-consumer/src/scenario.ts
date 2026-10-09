import { initialState, transition } from '@agis/state-contract';

export function runPackageScenario() {
  return transition(transition(initialState, { type: 'TOGGLE_SCALE' }), { type: 'TOGGLE_SHAPE' });
}
