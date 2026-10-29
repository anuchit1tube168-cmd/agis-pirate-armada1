import type {Command} from './state';
export function bindInput(dispatch:(command:Command)=>void){
  const map=[['#shape','NEXT_SHAPE'],['#motion','TOGGLE_MOTION'],['#wireframe','TOGGLE_WIREFRAME']] as const;
  const cleanups:(()=>void)[]=[];
  for(const [selector,type] of map){const el=document.querySelector<HTMLButtonElement>(selector);const fn=()=>dispatch({type} as Command);el?.addEventListener('click',fn);cleanups.push(()=>el?.removeEventListener('click',fn));}
  const onKey=(event:KeyboardEvent)=>{if(event.key==='s')dispatch({type:'NEXT_SHAPE'});if(event.key==='m')dispatch({type:'TOGGLE_MOTION'});if(event.key==='w')dispatch({type:'TOGGLE_WIREFRAME'});};
  document.addEventListener('keydown',onKey);cleanups.push(()=>document.removeEventListener('keydown',onKey));return()=>cleanups.forEach(fn=>fn());
}
