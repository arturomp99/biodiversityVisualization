export const observeResize = (observedElement, resizeHandler) => {
  const observer = new ResizeObserver((entries) => resizeHandler(entries));
  observer.observe(observedElement);
};
