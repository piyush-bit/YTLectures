import React from 'react';
import linkifyHtml from 'react-linkify';

function VideoDescription({ description }) {
  // Function to convert text with links into HTML
  const createMarkup = (text) => {
    const linkedText = linkifyHtml(text);
    return { __html: linkedText };
  };

  return (
    <div>
      {/* Render the HTML with links */}
      <div dangerouslySetInnerHTML={createMarkup(description)} />
    </div>
  );
}

export default VideoDescription;
