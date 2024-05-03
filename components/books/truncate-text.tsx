import React, { FC } from 'react';

interface TruncateTextProps {
  text: string;
  limit: number;
}

const TruncateText: FC<TruncateTextProps> = ({ text, limit }) => {
  let truncatedText = text;

  if (truncatedText.length > limit) {
    const lastSpaceIndex = truncatedText.lastIndexOf(' ', limit);

    if (lastSpaceIndex !== -1) {
      truncatedText = truncatedText.substring(0, lastSpaceIndex) + '...';
    } else {
      truncatedText = truncatedText.substring(0, limit) + '...';
    }
  }

  return <span title={text}>{truncatedText}</span>;
};

export default TruncateText;