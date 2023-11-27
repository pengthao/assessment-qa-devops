const shuffle = require("../src/shuffle");
const bots = require('../src/botsData.js')

//shuffle

/*attempt 1 - failed
it("should return an array of 10 objects from botData.js in a random order", () => {
  let shuffled = shuffle(bots);
  expect(shuffled).not.toEqual(bots);
});
*/

/*attempt 2 - toBe points if the operands refer to the same reference in memory.
    This doesnt tell me if the objects have been shuffled. If I point to any other
    variable this will pass.


it("should return an array of 10 objects from botData.js in a random order", () => {
 
  let shuffled = shuffle([...bots]);

  expect(shuffled).toHaveLength(bots.length);

  expect(new Set(shuffled)).toEqual(new Set(bots)); 

  expect(shuffled).not.toEqual(bots); 
});

*/

/* attempt 3 - I wanted to confirm that the shuffle operation is functioning
    even if we randomly shuffle to the original order. This method checks to see
    if there is a difference on 5 occasions on the rare chance that order is the same
    also it confirms it doesn't only check to see if we are referring to 2 difference
    references. It checks that the array is actually different.

it("should return an array of 10 objects from botData.js in a random order", () => {

  let numberOfAttempts = 5;

  let isDifferentOrder = false;

  for(let i = 0; i < numberOfAttempts; i++) {
    let shuffled = shuffle([...bots]);

    expect(shuffled).toHaveLength(bots.length);
    expect(new Set(shuffled)).toEqual(new Set(bots));

    if(!isDifferentOrder) {
      isDifferentOrder = !arraysAreEqual(shuffled, bots);
    }
  }
  
  expect(isDifferentOrder).toBe(true);

  function arraysAreEqual(arr1,arr2) {
    if(arr1.length !== arr2.length) {
      return false;
    } 
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true
  }
});
*/

/*attempt 4 - time complexity - converts elements to strings and adds into sets
    if there is more than 1 set then we know that the order has changed, and shuffle 
    is working properly*/

it("should return an array of 10 objects from botData.js in a random order", () => {
  const numberOfShuffles = 5;

  const originalOrder = JSON.stringify(bots.slice());
  const ordersSet = new Set();

  ordersSet.add(originalOrder);

  for (let i = 0; i < numberOfShuffles; i++) {
    let shuffled = shuffle([...bots]); 

    ordersSet.add(JSON.stringify(shuffled));
  }

  expect(ordersSet.size).toBeGreaterThan(1);
});
