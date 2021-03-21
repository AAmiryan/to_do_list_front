import React, { useState, useEffect } from 'react';

function FunctionExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
    console.log('useEffect');
  });

  return (
    <div>
      <p> FunctionExample Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  );
}

export default FunctionExample
