export function convertToNullableNumber(value) {
  if (value === '') {
    return null;
  } else {
    const numberValue = Number(value);
    return isNaN(numberValue) ? null : numberValue;
  }
}
