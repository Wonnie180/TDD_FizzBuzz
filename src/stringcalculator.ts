export default class StringCalculator {
  defaultSeparator = ','
  validSeparators = ['\n']
  customSeparatorBegin = '//'
  customSeparatorEnd = '\n'
  excepcionDescription = 'negativos no soportados'


  isEmpty(numbers: string) {
    return numbers.length < 1
  }

  hasMoreThan1Number(numbers: string) {
    return numbers.includes(this.defaultSeparator)
  }

  obtainNumbersFromString(numbers: string) {
    const numbersFromString =  numbers.split(this.defaultSeparator).map(numero => parseInt(numero))
    const negativeNumbers = numbersFromString.filter((value) => value < 0);
    if (negativeNumbers.length > 0){
        throw new Error(this.excepcionDescription)
    }

    return numbersFromString;
    
  }

  obtainSumOfArrayOfNumbers(numbers: number[]) {
    return numbers.reduce((partialSum, number) => partialSum + number, 0)
  }

  obtainSumOfArrayOfString(numbers: string) {
    return this.obtainSumOfArrayOfNumbers(this.obtainNumbersFromString(numbers))
  }

  haveCustomDelimiter(numbers: string) {
    return numbers.startsWith(this.customSeparatorBegin)
  }

  obtainIndexEndOfCustomSeparator(numbers: string) {
    return numbers.indexOf(this.customSeparatorEnd)
  }

  addCustomSeparatorToSeparators(numbers: string) {
    this.validSeparators.push(
      numbers.substring(this.customSeparatorBegin.length, this.obtainIndexEndOfCustomSeparator(numbers))
    )
  }

  Add(numbers: string) {
    if (this.haveCustomDelimiter(numbers)) {
      this.addCustomSeparatorToSeparators(numbers)
      numbers = numbers.substring(this.obtainIndexEndOfCustomSeparator(numbers) + 1)
    }

    this.validSeparators.forEach(separator => {
      numbers = numbers.replace(new RegExp(`\\${separator}`, 'g'), this.defaultSeparator)
    })

    this.validSeparators = ['\n']

    if (this.isEmpty(numbers)) return 0
    if (!this.hasMoreThan1Number(numbers)) return parseInt(numbers)
    else return this.obtainSumOfArrayOfString(numbers)
  }
}
