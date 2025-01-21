import React, { useState } from "react";
import "./App.scss";
import useStore from "HomeApp/hooks/useStore";
import { useStoreSelector } from "HomeApp/hooks/useStoreSelector";

function App() {
  return (
    <div className="main">
      <div className="mainContent">
        <MainContent />
      </div>
    </div>
  );
}

const MainContent = () => {
  const {
    todos: { previewContent, listTodos },
  } = useStoreSelector((state) => state);

  const { addTodos } = useStore();

  const [text, setText] = useState("");

  console.log(listTodos);
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      addTodos(text);
      setText("");
    }
  };

  if (previewContent === "INPUT") {
    return (
      <div className="input-container">
        <span>Silahkan isi disini</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleSubmit}
        />
      </div>
    );
  }

  return <div className="input-container">apa aja untuk tes aja ini mah!!!</div>;
};

export default App;
