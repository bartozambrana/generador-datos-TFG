const randomNumberINT = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = { randomNumber, randomNumberINT };
