export function convertToNullableNumber(value) {
  if (value === '') {
    return null;
  } else {
    const numberValue = Number(value);
    return isNaN(numberValue) ? null : numberValue;
  }
}

export function convertToEmptyString(value) {
  return value === null ? '' : value.toString();
}