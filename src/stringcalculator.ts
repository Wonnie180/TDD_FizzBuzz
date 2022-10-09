export default class StringCalculator {
  defaultSeparator = ','
  validSeparators = ['\n']
  customSeparatorBegin = '//'
  customSeparatorEnd = '\n'
  errorNegativeNumbersDescription = 'negativos no soportados: '
  special_characters = ['*', '\\', '[', '(', '.', '?', '+']

  isEmpty(numbers: number[]) {
    return numbers.length < 1 || isNaN(numbers[0])
  }

  hasMoreThan1Number(numbers: number[]) {
    return numbers.length > 1
  }

  obtainNumbersFromString(numbers: string) {
    const numbersWithDefaultSeparator = this.replaceSeparatorsWithDefaultSeparator(numbers)
    return numbersWithDefaultSeparator.split(this.defaultSeparator).map(numero => parseInt(numero))
  }

  obtainNegativeNumbers(numbers: number[]) {
    return numbers.filter(value => value < 0)
  }

  hasNegativeNumbers(numbers: number[]) {
    return numbers.some(number => number < 0)
  }

  throwNegativeNumbersError(numbers: number[]) {
    const negativeNumbers = this.obtainNegativeNumbers(numbers)
    throw new Error(this.errorNegativeNumbersDescription + negativeNumbers)
  }

  obtainSumOfArrayOfNumbers(numbers: number[]) {
    return numbers.reduce((partialSum, number) => partialSum + number, 0)
  }

  haveCustomDelimiter(numbers: string) {
    return numbers.startsWith(this.customSeparatorBegin)
  }

  obtainIndexEndOfCustomSeparator(numbers: string) {
    return numbers.indexOf(this.customSeparatorEnd)
  }

  isCustomSeparatorMultiCharacter(
    numbers: string,
    beginCustomSeparator: number,
    endOfCustomSeparatorDeclaration: number
  ) {
    return numbers[beginCustomSeparator] === '[' && numbers[endOfCustomSeparatorDeclaration - 1] === ']'
  }

  addCustomSeparatorToSeparators(numbers: string) {
    let beginCustomSeparator = this.customSeparatorBegin.length
    let endCustomSeparator = this.obtainIndexEndOfCustomSeparator(numbers)
    if (this.isCustomSeparatorMultiCharacter(numbers, beginCustomSeparator, endCustomSeparator)) {
      beginCustomSeparator += 1
      endCustomSeparator -= 1
    }
    this.validSeparators.push(numbers.substring(beginCustomSeparator, endCustomSeparator))
  }

  removeCustomSeparatorDeclarationFromString(numbers: string) {
    return numbers.substring(this.obtainIndexEndOfCustomSeparator(numbers) + 1)
  }

  customSeparatorHasSpecialCharacters(separator: string) {
    return this.special_characters.some(character => separator.includes(character))
  }

  resetValidSeparatos() {
    this.validSeparators = ['\n']
  }

  obtainSpecialCharactersInCustomSeparator(separator: string){
    return this.special_characters.filter(character => separator.includes(character))
  }

  replaceSeparatorsWithDefaultSeparator(numbers: string) {
    this.validSeparators.forEach(separator => {
      if (numbers.includes(separator)) {
        if (this.customSeparatorHasSpecialCharacters(separator)) {
          const special_characters = this.obtainSpecialCharactersInCustomSeparator(separator)
          special_characters.forEach(character => {
            separator = separator.replace(new RegExp(`\\${character}`,'g'),'\\$&')
            console.log(separator);
          })
        }

        numbers = numbers.replace(new RegExp(`${separator}`, 'g'), this.defaultSeparator)
      }
    })

    this.resetValidSeparatos()

    return numbers
  }

  anyIsBiggerThan1000(numbers: number[]) {
    return numbers.some(number => number > 1000)
  }

  removeNumbersBiggerThan1000(numbers: number[]) {
    return numbers.filter(number => number < 1000)
  }

  Add(numbersInString_input: string) {
    if (this.haveCustomDelimiter(numbersInString_input)) {
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
}
