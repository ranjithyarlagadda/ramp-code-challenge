import React, { useEffect, useState } from 'react';

const HiddenUrlExtractor = () => {
  const [hiddenUrl, setHiddenUrl] = useState('');

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        // Step 1: Fetch the HTML content from the provided URL
        const url = 'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge';
        const response = await fetch(url);
        const text = await response.text();

        // Step 2: Parse the HTML content by creating a DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Step 3: Find all <i> tags with class "char" following the specified DOM pattern
        const validCharacters = [];
        const codeTags = doc.querySelectorAll('code[data-class^="23"]');

        codeTags.forEach(codeTag => {
          const divTag = codeTag.querySelector('div[data-tag$="93"]');
          if (divTag) {
            const spanTag = divTag.querySelector('span[data-id*="21"]');
            if (spanTag) {
              const iTag = spanTag.querySelector('i.char');
              if (iTag && iTag.hasAttribute('value')) {
                const validCharacter = iTag.getAttribute('value');
                validCharacters.push(validCharacter);
              }
            }
          }
        });

        // Step 4: Join the collected characters to form the hidden URL
        const hiddenUrl = validCharacters.join('');
        setHiddenUrl(hiddenUrl);

      } catch (error) {
        console.error('Error fetching or parsing HTML content:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  return (
    <div>
      <h1>Hidden URL Extractor</h1>
      {hiddenUrl ? (
        <p>Hidden URL: {hiddenUrl}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HiddenUrlExtractor;