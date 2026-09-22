import type {AppState} from './state';

export type UiPorts = Readonly<{viewport: HTMLDivElement; status: HTMLDivElement}>;

export function getUiPorts(): UiPorts {
  return {
    viewport: document.querySelector<HTMLDivElement>('#viewport')!,
    status: document.querySelector<HTMLDivElement>('#status')!,
  };
}

export function showState(status: HTMLDivElement, state: AppState): void {
  status.textContent = `${state.shape}, scale ${state.scale}`;
}

export function showFallback(ports: UiPorts, message: string): void {
  ports.viewport.textContent = message;
  ports.status.textContent = '3D fallback active';
}

export function applyMotionPreference(status: HTMLDivElement): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) status.dataset.motion = 'reduced';
}
