export type Shape='box'|'sphere'|'cone';
export type AppState={shape:Shape;motion:boolean;wireframe:boolean};
export type Command=
  |{type:'NEXT_SHAPE'}
  |{type:'TOGGLE_MOTION'}
  |{type:'TOGGLE_WIREFRAME'};

export const initialState:AppState={shape:'box',motion:true,wireframe:false};
const shapes:Shape[]=['box','sphere','cone'];

export function transition(state:AppState,command:Command):AppState{
  if(command.type==='NEXT_SHAPE'){
    const next=(shapes.indexOf(state.shape)+1)%shapes.length;
    return {...state,shape:shapes[next]};
  }
  if(command.type==='TOGGLE_MOTION') return {...state,motion:!state.motion};
  return {...state,wireframe:!state.wireframe};
}
