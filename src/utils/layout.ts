export const goToElement = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
};
