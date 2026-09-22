import {FALLBACK_MESSAGE} from './data';
import {bindInputs} from './input';
import {createRenderer} from './render';
import {dispatch, getState} from './simulation';
import {applyMotionPreference, getUiPorts, showFallback, showState} from './ui';

const ui = getUiPorts();
const draw = (renderer: ReturnType<typeof createRenderer>) => {
  const state = getState();
  renderer.render(state);
  showState(ui.status, state);
};

try {
  const renderer = createRenderer(ui.viewport);
  draw(renderer);
  bindInputs(command => { dispatch(command); draw(renderer); });
} catch {
  showFallback(ui, FALLBACK_MESSAGE);
  bindInputs(command => { dispatch(command); showState(ui.status, getState()); });
}
applyMotionPreference(ui.status);
