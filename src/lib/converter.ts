// Write a utility function that converts farenheit to celsius

export function convertFarenheitToCelsius(farenheit: number): number {
  return Math.round(((farenheit - 32) * 5) / 9);
}

export function convertCelsiusToFarenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}
