const numbers = [ 2, 5, 8, 14, 0 ];

const getSum = (numset, number) => {

    const olds = []; // Save iterated elements
    
    return numset.reduce((acc, cur) => {
        if(acc.length === 2) {
            return acc; // Return the resulting array
        }
        // If the complement of the current element exists for the sum,
        // add the element and its complement.
        if(olds.includes(number - cur)) {
            acc.push(number - cur, cur);
        }
        // Add iterated item for future reviews
        olds.push(cur);

        return acc;
    }, []);
}

console.log(getSum(numbers, 10)); // [ 2, 8 ]