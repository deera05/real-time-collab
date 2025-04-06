import React, { useState } from 'react';

function Editor() {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="editor-container">
      <h2>Welcome to SyncWrite Editor</h2>
      <textarea value={content} onChange={handleChange} rows={20} cols={80} />
    </div>
  );
}

export default Editor;