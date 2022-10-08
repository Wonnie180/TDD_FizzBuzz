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

  isFizzBuzz(num: number) {
    return (this.isDivisibleBy3(num) && this.isDivisibleBy5(num)) || (this.numContains3(num) && this.numContains5(num))
  }

  isFizz(num: number) {
    return this.isDivisibleBy3(num) || this.numContains3(num)
  }

  isBuzz(num: number) {
    return this.isDivisibleBy5(num) || this.numContains5(num)
  }

  getResponse(num: number): string | number {
    if (this.isFizzBuzz(num)) return this.Results[2]
    if (this.isFizz(num)) return this.Results[0]
    if (this.isBuzz(num)) return this.Results[1]
    return num
  }
}
