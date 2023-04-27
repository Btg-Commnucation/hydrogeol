import { useEffect, useState } from "react";

const Loading = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Chargement';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText(text + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100); // 100 ms de délai entre chaque lettre

      return () => clearTimeout(timeoutId);
    } else {
      setTimeout(() => {
        setText('');
        setCurrentIndex(0);
      }, 2000)
    }
  }, [text, currentIndex, fullText]);

  return (
    <section className="loading">
      <div className="container">
        <div className="logo">
          <img
            src="/hydrogeol-logo.svg"
            alt="Logo d'hydrogeol en forme de goutte"
            className="logo-img"
          />
          <div
            className="pulse"></div>
          <div
            className="pulse-1"></div>
        </div>
        <h1>
          {text} <span>{text}</span>
        </h1>
      </div>
    </section>
  );
};

export default Loading;
