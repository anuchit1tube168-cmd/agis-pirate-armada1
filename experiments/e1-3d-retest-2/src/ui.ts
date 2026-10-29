export function showFallback(host:HTMLDivElement,message:string){host.textContent=`3D unavailable: ${message}. Controls remain usable.`;host.dataset.mode='fallback';}
export function markReducedMotion(host:HTMLDivElement,reduced:boolean){host.dataset.reducedMotion=String(reduced);}
