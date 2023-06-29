// 数値変換（null許可）
export function convertToNullableNumber(value) {
  if (value === '') {
    return null;
  } else {
    const numberValue = Number(value);
    return isNaN(numberValue) ? null : numberValue;
  }
}

// 文字列変換（null⇒''）
export function convertToEmptyString(value) {
  return value === null ? '' : value.toString();
}

// 明細マップ取得
export function getTabsData(count) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const item = {
      value: i.toString(),
      label: `明細${i}`
    };
    data.push(item);
  }
  return data;
}