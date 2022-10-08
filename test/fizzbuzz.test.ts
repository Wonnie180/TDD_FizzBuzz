import FizzBuzz from '../src/fizzbuzz'

describe('FizzBuzz', () => {
  const fizzBuzz = new FizzBuzz()
  const cases_expectedResults = ['Fizz', 'Buzz', 'FizzBuzz']

  const cases_base = [1, 2, 4, 7, 8, 11, 14]
  test.each(cases_base)('given %p returns %p', firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(firstArg)
  })

  const cases_divisible_by_3 = [3, 6, 9, 12]
  test.each(cases_divisible_by_3)(`given %p returns ${cases_expectedResults[0]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[0])
  })

  const cases_divisible_by_5 = [5, 10, 20, 25]
  test.each(cases_divisible_by_5)(`given %p returns ${cases_expectedResults[1]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[1])
  })

  const cases_divisible_by_3_and_5 = [15, 30, 45, 60, 75, 90]
  test.each(cases_divisible_by_3_and_5)(`given %p returns ${cases_expectedResults[2]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[2])
  })

  const cases_contain_a_3 = [13, 23, 31, 32, 34, 37, 38]
  test.each(cases_contain_a_3)(`given %p returns ${cases_expectedResults[0]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[0])
  })

  const cases_contain_a_5 = [52, 56, 58, 59]
  test.each(cases_contain_a_5)(`given %p returns ${cases_expectedResults[1]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[1])
  })

  const cases_contain_a_3_and_5 = [35, 53, 351]
  test.each(cases_contain_a_3_and_5)(`given %p returns ${cases_expectedResults[2]}`, firstArg => {
    const result = fizzBuzz.getResponse(firstArg)
    expect(result).toEqual(cases_expectedResults[2])
  })
})
