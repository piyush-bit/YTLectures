import React from 'react';

function DescriptionSection({ destext }) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text by line breaks (assuming each line is a separate paragraph)
  const paragraphs = destext.split('\n');

  // Function to replace URLs with anchor tags
  const renderWithLinks = (text) => {
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a className='text-blue-800' key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="description-section">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderWithLinks(paragraph)}</p>
      ))}
    </div>
  );
}

export default DescriptionSection;
