export type Shape='box'|'sphere';
export type AppState={shape:Shape;motion:boolean};
export type Command={type:'NEXT_SHAPE'}|{type:'TOGGLE_MOTION'};
export const initialState:AppState={shape:'box',motion:true};
export function transition(state:AppState,command:Command):AppState{
 if(command.type==='NEXT_SHAPE') return {...state,shape:state.shape==='box'?'sphere':'box'};
 return {...state,motion:!state.motion};
}
