import React from 'react';

function Description({ data }) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text by line breaks (assuming each line is a separate paragraph)
  const paragraphs = data.split('\n');

  // Function to reprrlace URLs with anchor tags
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
    <div className="description-section mt-20">
      {paragraphs.map((paragraph, index) => (
        <p className='my-5' key={index}>{renderWithLinks(paragraph)}</p>
      ))}
    </div>
  );
}

export default Description;
