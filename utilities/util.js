// -- TODO: Make this function work to generate unique key values for lists

const randomUserID = (values => {
  const valueLength = values.length;

  const randomIteration = (key, n) => {
    if (n === 0) {
      console.log('Completed key:', key);
      return key;
    }

    const randomIndex = Math.floor(Math.random() * valueLength);
    const randomChar = values[randomIndex];
    randomIteration(key + randomChar, n - 1);
  };

  return randomIteration("", 5);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

const myKey = randomUserID;
console.log(myKey);