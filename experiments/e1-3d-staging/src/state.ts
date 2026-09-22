export type Shape = 'box' | 'sphere';
export type AppState = Readonly<{shape: Shape; scale: 1 | 1.5}>;
export type Command = {type:'TOGGLE_SHAPE'} | {type:'TOGGLE_SCALE'};
export const initialState: AppState = {shape:'box', scale:1};
export function transition(state: AppState, command: Command): AppState {
  if (command.type === 'TOGGLE_SHAPE') return {...state, shape: state.shape === 'box' ? 'sphere' : 'box'};
  return {...state, scale: state.scale === 1 ? 1.5 : 1};
}
