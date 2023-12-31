import React, { FC } from 'react';

type TitleProps = {
  children: React.ReactNode;
  style?: string;
};
const Title: FC<TitleProps> = ({ children, style }) => {
  return <h1 className={`text-left text-2xl  md:text-base mt:text-xs ${style}`}>{children}</h1>;
};

export default Title;
