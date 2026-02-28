export function createCurrentLocationMarkerElement() {
  const el = document.createElement("div");
  el.style.width = "20px";
  el.style.height = "20px";
  el.style.borderRadius = "50%";
  el.style.background = "yellow";
  el.style.border = "3px solid black";
  el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  el.style.transform = "translate(-50%, -50%)";
  return el;
}