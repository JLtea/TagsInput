import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import TagsInput from './components/TagsInput'
function App() {
  return (
    <div style={{backgroundColor: '#f6f5f5', width: '100%', height: '50em', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TagsInput/>
    </div>
  );
}

export default App;
