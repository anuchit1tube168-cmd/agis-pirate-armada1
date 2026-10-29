import {initialState,transition,type AppState,type Command} from './state';import {createThreeRenderer,type RenderBoundary} from './render';import {bindInput} from './input';import {markReducedMotion,showFallback} from './ui';
const host=document.querySelector<HTMLDivElement>('#app')!;let state:AppState={...initialState};const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)state={...state,motion:false};markReducedMotion(host,reduced);let view:RenderBoundary|undefined;
function dispatch(command:Command){state=transition(state,command);view?.project(state);}
try{view=createThreeRenderer(host);view.project(state);const tick=()=>{view?.frame(state);requestAnimationFrame(tick);};tick();}catch(error){showFallback(host,error instanceof Error?error.message:'WebGL initialization failed');}
bindInput(dispatch);
