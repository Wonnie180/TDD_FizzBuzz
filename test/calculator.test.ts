import Calculator from '../src/calculator'

describe('Calculator', () => {
  const calculator = new Calculator()

  it('should add two numbers', () => {
    expect(calculator.add(1, 2)).toEqual(3)
  })

  it('should multiply two numbers', () => {
    expect(calculator.multiply(1, 2)).toEqual(2)
  })

  const cases = [
    [2, 2, 4],
    [-2, -2, -4],
    [2, -2, 0]
  ]
  test.each(cases)('given %p and %p as arguments, returns %p', (firstArg, secondArg, expectedResult) => {
    const result = calculator.add(firstArg, secondArg)
    expect(result).toEqual(expectedResult)
  })
})
