import * as THREE from 'three';
import {initialState, transition, type AppState, type Command} from './state';
let state: AppState = initialState;
const viewport = document.querySelector<HTMLDivElement>('#viewport')!;
const status = document.querySelector<HTMLDivElement>('#status')!;
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let mesh: THREE.Mesh | null = null;
function fallback(message:string){ viewport.textContent = message; status.textContent = '3D fallback active'; }
function project(){
  if(!scene || !mesh || !renderer || !camera) return;
  scene.remove(mesh);
  const geometry = state.shape === 'box' ? new THREE.BoxGeometry() : new THREE.SphereGeometry(.7,24,16);
  mesh = new THREE.Mesh(geometry,new THREE.MeshNormalMaterial()); mesh.scale.setScalar(state.scale); scene.add(mesh);
  renderer.render(scene,camera); status.textContent = `${state.shape}, scale ${state.scale}`;
}
function dispatch(command:Command){ state = transition(state,command); project(); }
try {
  renderer = new THREE.WebGLRenderer({antialias:true}); renderer.setSize(420,280); viewport.append(renderer.domElement);
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(60,1.5,.1,100); camera.position.z=3;
  mesh = new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshNormalMaterial()); scene.add(mesh); project();
} catch { fallback('3D preview unavailable. Configuration controls remain usable.'); }
document.querySelector('#shape')?.addEventListener('click',()=>dispatch({type:'TOGGLE_SHAPE'}));
document.querySelector('#scale')?.addEventListener('click',()=>dispatch({type:'TOGGLE_SCALE'}));
if (matchMedia('(prefers-reduced-motion: reduce)').matches) status.dataset.motion='reduced';
