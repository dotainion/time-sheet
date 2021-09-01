

const addTwoNumber = (num,  num2) =>{
  return num + num2;
}


test('test addition of two numbers', () => {
  expect(addTwoNumber(1, 2)).toBe(3);
});

