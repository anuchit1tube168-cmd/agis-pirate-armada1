import type {Command} from './state';

export function bindInputs(onCommand: (command: Command) => void): void {
  document.querySelector('#shape')?.addEventListener('click', () => onCommand({type:'TOGGLE_SHAPE'}));
  document.querySelector('#scale')?.addEventListener('click', () => onCommand({type:'TOGGLE_SCALE'}));
}
