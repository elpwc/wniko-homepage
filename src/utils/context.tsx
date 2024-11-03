import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义数据类型
type DataContextType = {
  bgIndex: number | null;
  setbgIndex: (newData: number) => void;
};

// 创建 Context，初始值为 undefined
const DataContext = createContext<DataContextType | undefined>(undefined);

// 创建 Provider 的 props 类型
type DataProviderProps = {
  children: ReactNode;
};

// 创建 Provider 组件
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [bgIndex, setbgIndex] = useState<number | null>(null);

  return <DataContext.Provider value={{ bgIndex, setbgIndex }}>{children}</DataContext.Provider>;
};

// 创建自定义 hook，便于使用 Context
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext 必须在 DataProvider 内使用');
  }
  return context;
};
