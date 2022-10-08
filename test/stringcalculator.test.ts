import StringCalculator from '../src/stringcalculator'

describe('FizzBuzz', () => {
  const stringCalculator = new StringCalculator()

  const cases_base_no_number: [string, number][] = [['', 0]]
  test.each(cases_base_no_number)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_1_number: [string, number][] = [
    ['1', 1],
    ['3', 3]
  ]
  test.each(cases_base_1_number)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_2_numbers: [string, number][] = [
    ['1,2', 3],
    ['3,4', 7]
  ]
  test.each(cases_base_2_numbers)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_more_than_2_numbers: [string, number][] = [
    ['1,2,3,4', 10],
    ['1,2,3,4,5,6,7,8,9,10', 55]
  ]
  test.each(cases_base_more_than_2_numbers)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_2_numbers_different_separator: [string, number][] = [
    ['1\n2', 3],
    ['4\n5', 9]
  ]
  test.each(cases_base_2_numbers_different_separator)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_3_numbers_different_separator: [string, number][] = [
    ['1\n2,3', 6],
    ['3,4\n5', 12]
  ]
  test.each(cases_base_3_numbers_different_separator)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const cases_base_1_number_not_valid_separator: [string, number][] = [
    ['1\n,', NaN],
    ['3,\n', NaN]
  ]
  test.each(cases_base_1_number_not_valid_separator)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })
  ;('//;\n1;2')

  const cases_base_3_numbers_custom_separator: [string, number][] = [
    ['//;\n1;2', 3],
    ['//;;;;\n1;;;;2', 3],
    ['//;!-_=\n1;!-_=2', 3],
    ['//;\n1;2;3', 6],
    ['//@#\n1@#2@#4', 7]
  ]
  test.each(cases_base_3_numbers_custom_separator)('given %p returns %p', (firstArg, expectedResult) => {
    const result = stringCalculator.Add(firstArg)
    expect(result).toEqual(expectedResult)
  })

  const excepcionDescription = 'negativos no soportados'
  const cases_base_2_negative_numbers: [string, string][] = [
    ['-1,2', excepcionDescription]
    // ['3,-4', excepcionDescription+" -4"]
  ]
  test.each(cases_base_2_negative_numbers)('given %p returns %p', (firstArg, expectedResult) => {
    expect(() => {
      return stringCalculator.Add(firstArg)
    }).toThrow(expectedResult)
  })
})
