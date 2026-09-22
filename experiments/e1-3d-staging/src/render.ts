import * as THREE from 'three';
import type {AppState} from './state';
import {VIEWPORT} from './data';

export interface RenderPort { render(state: AppState): void }

export function createRenderer(viewport: HTMLDivElement): RenderPort {
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(VIEWPORT.width, VIEWPORT.height);
  viewport.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, VIEWPORT.width / VIEWPORT.height, .1, 100);
  camera.position.z = 3;
  let mesh: THREE.Mesh | null = null;
  return { render(state: AppState): void {
    if (mesh) scene.remove(mesh);
    const geometry = state.shape === 'box' ? new THREE.BoxGeometry() : new THREE.SphereGeometry(.7,24,16);
    mesh = new THREE.Mesh(geometry,new THREE.MeshNormalMaterial());
    mesh.scale.setScalar(state.scale);
    scene.add(mesh);
    renderer.render(scene,camera);
  }};
}
