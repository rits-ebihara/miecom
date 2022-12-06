import React from 'react';

type Props = {
  caption: string;
};

export const Button: React.FC<Props> = ({ caption }) => {
  return <button className="btn btn-primary">{caption}</button>;
};
