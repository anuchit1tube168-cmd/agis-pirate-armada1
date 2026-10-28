import type {Command} from './state';

export function bindInput(dispatch:(command:Command)=>void){
  const shape=document.querySelector<HTMLButtonElement>('#shape');
  const motion=document.querySelector<HTMLButtonElement>('#motion');
  const onShape=()=>dispatch({type:'NEXT_SHAPE'});
  const onMotion=()=>dispatch({type:'TOGGLE_MOTION'});
  const onKey=(event:KeyboardEvent)=>{
    if(event.key==='s') onShape();
    if(event.key==='m') onMotion();
  };
  shape?.addEventListener('click',onShape);
  motion?.addEventListener('click',onMotion);
  document.addEventListener('keydown',onKey);
  return ()=>{
    shape?.removeEventListener('click',onShape);
    motion?.removeEventListener('click',onMotion);
    document.removeEventListener('keydown',onKey);
  };
}
