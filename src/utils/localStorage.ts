//本地存储设置数据
export const setItem = (key: string, value: string | object | null) => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    const stringValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, stringValue);
  }
};

//本地存储获取数据
export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (value === null) {
    return null; // 或者返回一个默认值，例如 {}
  }
  try {
    return JSON.parse(value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return value; // 如果解析失败，返回原始字符串
  }
};

// 清空单个
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

// 清空所有
export const clearItem = (): void => {
  localStorage.clear();
};
