import sum from './sum.js';

describe("testing for sum fxn", ()=>{
    test('adds 2+2 = 4', () => { 
    expect(sum(2,2)).toBe(4);
    })

    test('adds -1+2 = 1', () => { 
    expect(sum(-1,2)).toBe(1);
    })    
})
