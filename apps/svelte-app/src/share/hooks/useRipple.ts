export const useRipple = () => {
  const clickRipple = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement;

    //calculate the position and dimensions of the ripple.
    //based on click position and button dimensions
    const rect = element.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    const height = element.clientHeight;
    const width = element.clientWidth;
    const diameter = Math.max(width, height);
    const radius = diameter / 2;

    const circle = document.createElement('span');
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${left - radius}px`;
    circle.style.top = `${top - radius}px`;
    circle.classList.add('ripple-anim', 'animate-ripple');

    const ripple = element.getElementsByClassName('ripple-anim')[0];

    if (ripple) {
      ripple.remove();
    }

    element.appendChild(circle);
  };

  return { clickRipple };
};
