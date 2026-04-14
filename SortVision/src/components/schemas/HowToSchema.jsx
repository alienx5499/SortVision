import React from 'react';

const HowToSchema = ({ howToSchema }) => {
  if (!howToSchema) return null;
  return (
    <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
  );
};

export default HowToSchema;
