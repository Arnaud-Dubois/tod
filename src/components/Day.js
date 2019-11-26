import React from 'react';

export default function Day() {
  const date = new Date().toLocaleDateString()
  return (
    <>
        <div>
            {date}
        </div>
    </>
  );
}
