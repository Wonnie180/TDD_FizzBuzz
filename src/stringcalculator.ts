export default class StringCalculator {
  //-- Separator --
  defaultSeparator = ','
  validSeparators = ['\n']
  customSeparatorDeclarationBegin = '//'
  customSeparatorDeclarationEnd = '\n'
  customSeparatorBegin = '['
  customSeparatorEnd = ']'
  //-- Special Characters --
  specialCharacters = ['*', '\\', '[', '(', '.', '?', '+']
  //-- Errors --
  errorNegativeNumbersDescription = 'negativos no soportados: '
  errorMalformedCustomSeparatorDescription = 'El separador personalizado está mal formado.'
  errorInvalidCustomDeclaration = 'La declaración del separador personalizado esta mal formada.'
  //-- Functions/Methods --

  //- Main Functions/Methods -
  Add(numbersInString_input: string) {
    if (this.haveCustomDelimiter(numbersInString_input)) {
      if (!this.isValidCustomDelimiter(numbersInString_input)) return this.throwInvalidCustomDeclarationError()
      this.addCustomSeparatorToSeparators(numbersInString_input)
      numbersInString_input = this.removeCustomSeparatorDeclarationFromString(numbersInString_input)
    }

    let numbers: number[] = this.obtainNumbersFromString(numbersInString_input)

    if (this.hasNegativeNumbers(numbers)) return this.throwNegativeNumbersError(numbers)
    if (this.anyIsBiggerThan1000(numbers)) numbers = this.removeNumbersBiggerThan1000(numbers)
    if (this.isEmpty(numbers)) return 0
    if (!this.hasMoreThan1Number(numbers)) return numbers[0]
    else return this.obtainSumOfArrayOfNumbers(numbers)
  }

  //-- Auxiliary Functions/Methods --

  //-- Add... --
  addCustomSeparatorWithMoreThanOneCharacter(numbers: string, beginSeparator: number, endSeparator: number) {
    if (this.isMalformedCustomSeparator(numbers, beginSeparator, endSeparator - 1))
      throw new Error(this.errorMalformedCustomSeparatorDescription)
    this.validSeparators.push(numbers.substring(beginSeparator + 1, endSeparator - 1))
  }

  addCustomSeparatorToSeparators(numbers: string) {
    const beginDeclarationOfSeparator = this.customSeparatorDeclarationBegin.length
    const endDeclarationOfSeparator = this.obtainIndexOfCustomSeparatorDeclarationEnd(numbers)

    if (!this.hasCustomSeparatorMoreThanOneCharacter(beginDeclarationOfSeparator + 1, endDeclarationOfSeparator - 1)) {
      this.addCustomSeparatorWithOnlyOneCharacter(numbers, beginDeclarationOfSeparator)
      return
    }

    if (!this.hasMoreThanOneCustomSeparator(numbers, beginDeclarationOfSeparator, endDeclarationOfSeparator)) {
      this.addCustomSeparatorWithMoreThanOneCharacter(numbers, beginDeclarationOfSeparator, endDeclarationOfSeparator)
      return
    }

    const numberOfCustomSeparators = this.obtainIndexesOfCustomSeparators(numbers)
    numberOfCustomSeparators.forEach(([separatorBeginIndex, separatorEndIndex]) => {
      this.addCustomSeparatorWithIndexes(numbers, separatorBeginIndex, separatorEndIndex)
    })
  }

  addCustomSeparatorWithOnlyOneCharacter(numbers: string, beginSeparator: number) {
    this.validSeparators.push(numbers.substring(beginSeparator, beginSeparator + 1))
  }

  addCustomSeparatorWithIndexes(numbers: string, beginSeparator: number, endSeparator: number) {
    if (!this.hasCustomSeparatorMoreThanOneCharacter(beginSeparator + 1, endSeparator - 1)) {
      this.addCustomSeparatorWithOnlyOneCharacter(numbers, beginSeparator + 1)
      return
    }

    this.addCustomSeparatorWithMoreThanOneCharacter(numbers, beginSeparator, endSeparator + 1)
  }

  addEscapeCharacterToSpecialCharacter(separator: string, special_character: string) {
    return separator.replace(new RegExp(`\\${special_character}`, 'g'), '\\$&')
  }

  //-- Any... --
  anyIsBiggerThan1000(numbers: number[]) {
    return numbers.some(number => number > 1000)
  }

  //-- Has... --
  hasMoreThan1Number(numbers: number[]) {
    return numbers.length > 1
  }

  hasNegativeNumbers(numbers: number[]) {
    return numbers.some(number => number < 0)
  }

  hasCustomSeparatorMoreThanOneCharacter(beginCustomSeparator: number, endCustomSeparator: number) {
    return endCustomSeparator - beginCustomSeparator >= 1
  }

  HasSpecialCharacters(separator: string) {
    return this.specialCharacters.some(character => separator.includes(character))
  }

  hasMoreThanOneCustomSeparator(text: string, beginDeclarationOfSeparator: number, endDeclarationOfSeparator: number) {
    let scope = 1
    for (let i = beginDeclarationOfSeparator + 1; i < endDeclarationOfSeparator; i++) {
      let character = text[i]
      if (scope === 0 && character === this.customSeparatorBegin) return true
      if (character === this.customSeparatorBegin) scope += 1
      else if (character === this.customSeparatorEnd) scope -= 1
    }
    return false
  }

  //-- Have... --
  haveCustomDelimiter(numbers: string) {
    return (
      numbers.length > 0 &&
      !(this.isNumber(numbers[0]) || this.isMathPrefix(numbers[0]) || this.isAllowedDefaultSeparator(numbers[0]))
    )
  }

  //-- Is... --
  isMathPrefix(character: string) {
    return character === '-' || character === '+'
  }

  isNumber(character: string) {
    return character >= '0' && character <= '9'
  }

  isAllowedDefaultSeparator(character: string) {
    return character === this.defaultSeparator || character === this.validSeparators[0]
  }

  isValidCustomDelimiter(numbers: string) {
    return (
      numbers.startsWith(this.customSeparatorDeclarationBegin) && numbers.includes(this.customSeparatorDeclarationEnd)
    )
  }

  isEmpty(numbers: number[]) {
    return numbers.length < 1 || isNaN(numbers[0])
  }

  isCustomSeparatorMultiCharacter(
    numbers: string,
    beginCustomSeparator: number,
    endOfCustomSeparatorDeclaration: number
  ) {
    return (
      numbers[beginCustomSeparator] === this.customSeparatorBegin &&
      numbers[endOfCustomSeparatorDeclaration - 1] === this.customSeparatorEnd
    )
  }

  isMalformedCustomSeparator(numbers: string, beginCustomSeparator: number, endCustomSeparator: number) {
    return !(
      numbers[beginCustomSeparator] === this.customSeparatorBegin &&
      numbers[endCustomSeparator] === this.customSeparatorEnd
    )
  }

  //-- Obtain... --
  obtainNumbersFromString(numbers: string) {
    const numbersWithDefaultSeparator = this.replaceSeparatorsWithDefaultSeparator(numbers)
    return numbersWithDefaultSeparator.split(this.defaultSeparator).map(numero => parseInt(numero))
  }

  obtainNegativeNumbers(numbers: number[]) {
    return numbers.filter(value => value < 0)
  }

  obtainSumOfArrayOfNumbers(numbers: number[]) {
    return numbers.reduce((partialSum, number) => partialSum + number, 0)
  }

  obtainIndexOfCustomSeparatorDeclarationEnd(numbers: string) {
    return numbers.indexOf(this.customSeparatorDeclarationEnd)
  }

  obtainIndexesOfCustomSeparators(numbers: string) {
    const beginDeclarationOfSeparator: number = this.customSeparatorDeclarationBegin.length
    const endDeclarationOfSeparator: number = this.obtainIndexOfCustomSeparatorDeclarationEnd(numbers)

    let scope: number = 1
    let beginIndexOfCustomseparator: number = beginDeclarationOfSeparator
    let endIndexOfCustomSeparator: number = -1
    const indexesOfCustomSeparators: [number, number][] = []
    for (let i: number = beginDeclarationOfSeparator + 1; i < endDeclarationOfSeparator; i++) {
      let character: string = numbers[i]
      if (scope === 0 && character === this.customSeparatorBegin) beginIndexOfCustomseparator = i
      if (character === this.customSeparatorBegin) scope += 1
      else if (character === this.customSeparatorEnd) scope -= 1
      if (scope === 0) {
        endIndexOfCustomSeparator = i
        indexesOfCustomSeparators.push([beginIndexOfCustomseparator, endIndexOfCustomSeparator])
      }
    }
    if (endIndexOfCustomSeparator + 1 !== endDeclarationOfSeparator)
      throw new Error(this.errorMalformedCustomSeparatorDescription)

    return indexesOfCustomSeparators
  }

  obtainSpecialCharacters(separator: string) {
    return this.specialCharacters.filter(character => separator.includes(character))
  }

  //-- Remove... --
  removeCustomSeparatorDeclarationFromString(numbers: string) {
    return numbers.substring(this.obtainIndexOfCustomSeparatorDeclarationEnd(numbers) + 1)
  }

  removeNumbersBiggerThan1000(numbers: number[]) {
    return numbers.filter(number => number < 1000)
  }

  //-- Replace... --
  replaceSeparatorsWithDefaultSeparator(numbers: string) {
    this.validSeparators.forEach(separator => {
      if (this.HasSpecialCharacters(separator)) {
        const special_characters = this.obtainSpecialCharacters(separator)
        special_characters.forEach(special_character => {
          separator = this.addEscapeCharacterToSpecialCharacter(separator, special_character)
        })
      }

      numbers = numbers.replace(new RegExp(`${separator}`, 'g'), this.defaultSeparator)
    })

    this.resetValidSeparatos()

    return numbers
  }

  //-- Reset... --
  resetValidSeparatos() {
    this.validSeparators = ['\n']
  }

  //-- Throw... --
  throwNegativeNumbersError(numbers: number[]) {
    const negativeNumbers = this.obtainNegativeNumbers(numbers)
    throw new Error(this.errorNegativeNumbersDescription + negativeNumbers)
  }

  throwInvalidCustomDeclarationError() {
    throw new Error(this.errorInvalidCustomDeclaration)
  }
}
