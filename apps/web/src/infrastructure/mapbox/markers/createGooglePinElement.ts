export function createGooglePinElement(options?: { color?: string }) {
  const color = options?.color ?? "#EA4335";

  const el = document.createElement("div");
  el.style.position = "relative";
  el.style.width = "28px";
  el.style.height = "40px";
  el.style.transform = "translate(-50%, -100%)";

  const circle = document.createElement("div");
  circle.style.width = "28px";
  circle.style.height = "28px";
  circle.style.background = color;
  circle.style.borderRadius = "50%";
  circle.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  circle.style.position = "absolute";
  circle.style.top = "0";
  circle.style.left = "0";

  const inner = document.createElement("div");
  inner.style.width = "12px";
  inner.style.height = "12px";
  inner.style.background = "white";
  inner.style.borderRadius = "50%";
  inner.style.position = "absolute";
  inner.style.top = "8px";
  inner.style.left = "8px";

  const tail = document.createElement("div");
  tail.style.width = "0";
  tail.style.height = "0";
  tail.style.borderLeft = "10px solid transparent";
  tail.style.borderRight = "10px solid transparent";
  tail.style.borderTop = `16px solid ${color}`;
  tail.style.position = "absolute";
  tail.style.top = "24px";
  tail.style.left = "50%";
  tail.style.transform = "translateX(-50%)";

  circle.appendChild(inner);
  el.appendChild(circle);
  el.appendChild(tail);

  return el;
}