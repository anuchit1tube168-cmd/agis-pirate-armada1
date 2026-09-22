import {initialState, transition, type AppState, type Command} from './state';

let currentState: AppState = initialState;

export function getState(): AppState { return currentState; }
export function dispatch(command: Command): AppState {
  currentState = transition(currentState, command);
  return currentState;
}
