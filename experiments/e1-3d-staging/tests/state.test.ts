import {describe,it,expect} from 'vitest';
import {initialState,transition} from '../src/state';
describe('configuration transition',()=>{
  it('toggles shape deterministically',()=>expect(transition(initialState,{type:'TOGGLE_SHAPE'})).toEqual({shape:'sphere',scale:1}));
  it('toggles scale deterministically',()=>expect(transition(initialState,{type:'TOGGLE_SCALE'})).toEqual({shape:'box',scale:1.5}));
});
