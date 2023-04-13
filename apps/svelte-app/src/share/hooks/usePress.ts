/** Dispatch event on mouse long press of node */
export const press = (node: any) => {
  const handleMouseDown = () => {
    const timeout = setInterval(() => {
      node.dispatchEvent(new CustomEvent('mouse-press', node));
      if (node.disabled) {
        cancel()
      }
    }, 100);

    const cancel = () => {
      clearTimeout(timeout);
      node.removeEventListener('mouseup', cancel);
      node.addEventListener('mouseleave', cancel);
    };

    node.addEventListener('mouseup', cancel);
    node.addEventListener('mouseleave', cancel);
  }

  node.addEventListener('mousedown', handleMouseDown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  };
}