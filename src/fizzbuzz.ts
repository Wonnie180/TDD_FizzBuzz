export default class FizzBuzz {
  Results = ['Fizz', 'Buzz', 'FizzBuzz']

  isDivisibleBy3(num: number) {
    return num % 3 === 0
  }

  isDivisibleBy5(num: number) {
    return num % 5 === 0
  }

  numContains3(num: number) {
    return (num + '').includes('3')
  }

  numContains5(num: number) {
    return (num + '').includes('5')
  }

  getResponse(num: number): string | number {
    if ((this.isDivisibleBy3(num) && this.isDivisibleBy5(num)) || (this.numContains3(num) && this.numContains5(num)))
      return this.Results[2]
    if (this.isDivisibleBy3(num) || this.numContains3(num)) return this.Results[0]
    if (this.isDivisibleBy5(num) || this.numContains5(num)) return this.Results[1]
    return num
  }
}
