import StringCalculator from '../src/stringcalculator'

describe('StringCalculator', () => {
  const stringCalculator = new StringCalculator()
  describe('1.- Functionality Tests', () => {
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
  })
  describe('2.- Functionality Tests', () => {
    const cases_base_more_than_2_numbers: [string, number][] = [
      ['1,2,3,4', 10],
      ['1,2,3,4,5,6,7,8,9,10', 55]
    ]
    test.each(cases_base_more_than_2_numbers)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('3.- Functionality Tests', () => {
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
  })

  describe('4.- Functionality Tests', () => {
    const cases_base_3_numbers_custom_separator: [string, number][] = [
      ['//;\n1;2', 3],
      ['// \n1 2', 3],
      ['//[\n1[2', 3],
      ['//!\n1!2', 3],
      ['//_\n1_2_3', 6],
      ['//@\n1@2@4', 7],
      ['//*\n1*2', 3],
      ['//(\n1(2', 3],
      ['//.\n1.2', 3],
      ['//?\n1?2', 3],
      ['//+\n1+2', 3],
      ['///\n1/2', 3],
      ['//-\n1-2', 3],
      ['//{\n1{2', 3],
      ['//]\n1]2', 3]
    ]
    test.each(cases_base_3_numbers_custom_separator)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('5.- Functionality Tests', () => {
    const excepcionDescription = 'negativos no soportados: '
    const cases_base_2_negative_numbers: [string, string][] = [
      ['-1,2', excepcionDescription + '-1'],
      ['3,-4', excepcionDescription + '-4'],
      ['-3,-4', excepcionDescription + '-3,-4']
    ]
    test.each(cases_base_2_negative_numbers)('given %p returns %p', (firstArg, expectedResult) => {
      expect(() => {
        return stringCalculator.Add(firstArg)
      }).toThrow(expectedResult)
    })
  })

  describe('6.- Functionality Tests', () => {
    const cases_numbers_bigger_than_1000_should_be_ignored: [string, number][] = [
      ['1,1001', 1],
      ['1001,1002', 0],
      ['1,2\n3,1001', 6]
    ]
    test.each(cases_numbers_bigger_than_1000_should_be_ignored)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('7.- Functionality Tests', () => {
    const cases_custom_delimiter_has_more_than_1_character: [string, number][] = [
      ['//[,,,]\n1,,,2,,,3', 6],
      ['//[,;]\n1,;2,;3', 6],
      ['//[***]\n1***2***3', 6]
    ]
    test.each(cases_custom_delimiter_has_more_than_1_character)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })

    const errorMalformedCustomSeparatorDescription = 'El separador personalizado está mal formado.'
    const cases_custom_delimiter_has_more_than_1_character_malformed: [string, string][] = [
      ['//[,,,\n1,,,2,,,3', errorMalformedCustomSeparatorDescription]
      // ['//[ \n1,;2,;3', errorMalformedCustomSeparatorDescription],
      // ['//[***]\n1***2***3', 6]
    ]
    test.each(cases_custom_delimiter_has_more_than_1_character_malformed)(
      'given %p returns %p',
      (firstArg, expectedResult) => {
        expect(() => {
          return stringCalculator.Add(firstArg)
        }).toThrow(expectedResult)
      }
    )
  })

  describe('8.- Functionality Tests', () => {
    const cases_more_than_1_custom_delimiter: [string, number][] = [
      ['//[;][%]\n1;2%3', 6],
      ['//[;][%][!]\n1;2%3!4', 10]
    ]
    test.each(cases_more_than_1_custom_delimiter)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })

    const errorMalformedCustomSeparatorDescription = 'El separador personalizado está mal formado.'
    const cases_custom_delimiter_has_more_than_1_character_malformed: [string, string][] = [
      ['//[;][%\n1;2%3', errorMalformedCustomSeparatorDescription]
    ]
    test.each(cases_custom_delimiter_has_more_than_1_character_malformed)(
      'given %p returns %p',
      (firstArg, expectedResult) => {
        expect(() => {
          return stringCalculator.Add(firstArg)
        }).toThrow(expectedResult)
      }
    )
  })

  describe('9.- Functionality Tests', () => {
    const cases_more_than_1_custom_delimiter: [string, number][] = [
      ['//[;;][%%]\n1;;2%%3', 6],
      ['//[;;[!]][%][!]\n1;;[!]2%3!4', 10]
    ]
    test.each(cases_more_than_1_custom_delimiter)('given %p returns %p', (firstArg, expectedResult) => {
      const result = stringCalculator.Add(firstArg)
      expect(result).toEqual(expectedResult)
    })

    const errorMalformedCustomSeparatorDescription = 'El separador personalizado está mal formado.'
    const cases_custom_delimiter_has_more_than_1_character_malformed: [string, string][] = [
      ['//[;;][%%\n1;2%3', errorMalformedCustomSeparatorDescription],
      ['//[;;[%%\n1;2%3', errorMalformedCustomSeparatorDescription]
    ]
    test.each(cases_custom_delimiter_has_more_than_1_character_malformed)(
      'given %p returns %p',
      (firstArg, expectedResult) => {
        expect(() => {
          return stringCalculator.Add(firstArg)
        }).toThrow(expectedResult)
      }
    )
  })
})
