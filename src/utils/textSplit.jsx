import React from 'react';
export const SplitText = ({ text, className = '', lineClassName = 'split-line', wordClassName = 'split-word', charClassName = 'split-char' }) => {
    // Simple split by newlines for lines, then words, then chars
    const lines = text.split('\n');
    return (<div className={className}>
      {lines.map((line, lineIndex) => (<div key={`line-${lineIndex}`} className={lineClassName} style={{ overflow: 'hidden', display: 'block' }}>
          {line.split(' ').map((word, wordIndex) => (<div key={`word-${lineIndex}-${wordIndex}`} className={wordClassName} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
              {word.split('').map((char, charIndex) => (<span key={`char-${lineIndex}-${wordIndex}-${charIndex}`} className={charClassName} style={{ display: 'inline-block' }}>
                  {char}
                </span>))}
              {/* Add space after word if not last word in line */}
              {wordIndex !== line.split(' ').length - 1 && ' '}
            </div>))}
        </div>))}
    </div>);
};
