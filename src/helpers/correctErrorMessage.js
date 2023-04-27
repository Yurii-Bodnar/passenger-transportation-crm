export const correctErrorMessage = text => {
  const textPreparation = text.split('').splice(22);
  const correctMessage = textPreparation
    .splice(0, textPreparation.length - 1)
    .map(el => {
      if (el === '-') {
        return ' ';
      }
      if (el === ')') {
        return;
      }
      return el;
    })
    .join('');

  const response = `Error: ${correctMessage}!`;

  return response;
};
