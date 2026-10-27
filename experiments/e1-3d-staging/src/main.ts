import * as THREE from 'three';
import {initialState,transition,type AppState} from './state';
const host=document.querySelector<HTMLDivElement>('#app')!; let state:AppState={...initialState};
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduced) state={...state,motion:false};
let renderer:THREE.WebGLRenderer|undefined, mesh:THREE.Mesh|undefined, scene:THREE.Scene|undefined, camera:THREE.PerspectiveCamera|undefined;
function renderState(){ if(!scene||!mesh)return; scene.remove(mesh); const geometry=state.shape==='box'?new THREE.BoxGeometry():new THREE.SphereGeometry(.7,24,16); mesh=new THREE.Mesh(geometry,new THREE.MeshNormalMaterial()); scene.add(mesh); host.dataset.shape=state.shape; }
function fallback(message:string){host.textContent=`3D unavailable: ${message}. Controls remain usable.`; host.dataset.mode='fallback';}
try{ scene=new THREE.Scene(); camera=new THREE.PerspectiveCamera(70,1,.1,10); camera.position.z=2; renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setSize(320,320); host.replaceChildren(renderer.domElement); mesh=new THREE.Mesh(); renderState(); const tick=()=>{if(state.motion&&mesh)mesh.rotation.y+=.01; renderer!.render(scene!,camera!); requestAnimationFrame(tick)}; tick(); }catch(error){fallback(error instanceof Error?error.message:'WebGL initialization failed');}
function dispatch(command:Parameters<typeof transition>[1]){state=transition(state,command);renderState();}
document.querySelector('#shape')!.addEventListener('click',()=>dispatch({type:'NEXT_SHAPE'}));document.querySelector('#motion')!.addEventListener('click',()=>dispatch({type:'TOGGLE_MOTION'}));
document.addEventListener('keydown',e=>{if(e.key==='s')dispatch({type:'NEXT_SHAPE'});if(e.key==='m')dispatch({type:'TOGGLE_MOTION'});});
