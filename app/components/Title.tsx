import React, { FC } from 'react';

type TitleProps = {
  children: React.ReactNode;
};
const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className="text-left text-2xl mb-10 ">{children}</h1>;
};

export default Title;
