import * as THREE from 'three';
import type {AppState} from './state';

export type RenderBoundary={
  project:(state:AppState)=>void;
  frame:(state:AppState)=>void;
  dispose:()=>void;
};

export function createThreeRenderer(host:HTMLDivElement):RenderBoundary{
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(70,1,.1,10);
  camera.position.z=2;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(320,320);
  host.replaceChildren(renderer.domElement);
  let mesh:THREE.Mesh|undefined;

  function project(state:AppState){
    if(mesh){scene.remove(mesh);mesh.geometry.dispose();}
    const geometry=state.shape==='box'?new THREE.BoxGeometry():new THREE.SphereGeometry(.7,24,16);
    mesh=new THREE.Mesh(geometry,new THREE.MeshNormalMaterial());
    scene.add(mesh);
    host.dataset.shape=state.shape;
  }

  function frame(state:AppState){
    if(state.motion&&mesh) mesh.rotation.y+=.01;
    renderer.render(scene,camera);
  }

  function dispose(){
    if(mesh){mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();}
    renderer.dispose();
  }

  return {project,frame,dispose};
}
