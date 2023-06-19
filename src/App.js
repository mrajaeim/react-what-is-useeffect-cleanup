import React, { useEffect, useState } from 'react';
import './style.css';

class JustForChildComponent {
  constructor() {
    console.log('$$ JustForThisPage $$');
  }

  showPopUp() {
    alert('this is a sample popup');
  }

  addPopUp() {
    console.log('\t', 'addPopUp');
    window.addEventListener('click', this.showPopUp);
  }

  removePopUp() {
    console.log('\t', 'removePopUp');
    window.removeEventListener('click', this.showPopUp);
  }
}

export function Child() {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    // Runs only after the
    // initial render
    console.group('Child->', '+++++ initial render done!');
    let data = new JustForChildComponent();
    setInstance(data);
    return () => {
      console.log('Child->', '----- Clean up for component');
    };
  }, []);

  useEffect(() => {
    if (instance) {
      console.log('* instance is set for starting');
      instance.addPopUp();
    } else {
      console.log('* waiting for instance for starting');
    }
    return () => {
      console.log('Child->', '----- Clean up logic for prev effect');
      if (instance) {
        instance.removePopUp();
      } else {
        console.log('* there is no instance for clearing');
      }
    };
  }, [instance]);
  return (
    <div>
      <h2 style={{ color: 'red' }}>This is child component!</h2>
    </div>
  );
}

export default function App() {
  const [showChild, setShowChild] = useState(true);

  return (
    <div>
      <h1>Hello Friends!</h1>
      <p>watch console carefully</p>
      <button onClick={() => setShowChild(true)}>show child</button>
      <button onClick={() => setShowChild(false)}>hide child</button>
      {showChild ? <Child /> : null}
    </div>
  );
}
