import test from 'node:test';import assert from 'node:assert/strict';import {initialState,transition} from '../src/state';
test('NEXT_SHAPE is deterministic and renderer-independent',()=>{const a=transition(initialState,{type:'NEXT_SHAPE'});const b=transition(initialState,{type:'NEXT_SHAPE'});assert.deepEqual(a,b);assert.equal(a.shape,'sphere');assert.equal(initialState.shape,'box');});
test('TOGGLE_MOTION is reversible',()=>{const off=transition(initialState,{type:'TOGGLE_MOTION'});assert.equal(off.motion,false);assert.deepEqual(transition(off,{type:'TOGGLE_MOTION'}),initialState);});
