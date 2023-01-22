import React from 'react';

export const Image = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading='lazy' />;
};
