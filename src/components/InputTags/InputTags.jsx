import React, { useRef, useState } from "react";

function InputTags() {
  const inputRef = useRef(null);
  const [technology, setTechnology] = useState([]);

  const handlInput = (tag) => {
    document.getElementById("inputTag").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (technology.filter((tags) => tags !== tag)) {
          setTechnology([...technology, tag]);
        }
      }
    });
  };

  const removeTag = (wantToRemoveTag) => {
    console.log(wantToRemoveTag);
    const newTag = technology.filter((tag) => tag !== wantToRemoveTag);
    console.log(newTag);
    setTechnology(newTag);
  };
  return (
    <div>
      <input
        className="border"
        id="inputTag"
        type="text"
        onChange={(e) => handlInput(e.target.value)}
        ref={inputRef}
      />
      <div className="flex gap-2 my-4">
        {technology.map((tags, i) => {
          return (
            <button
              key={i}
              onClick={(e) => removeTag(e.currentTarget.innerText)}
              className="p-2 border text-white bg-black rounded-lg"
            >
              {tags}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default InputTags;
