import React, { useEffect, useState } from "react";

interface IProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function DurationInput({ inputValue, setInputValue }: IProps) {
  function changeValue(ev: React.ChangeEvent<HTMLInputElement>) {
    const input = ev.target.value;
    if (hasLetters(input)) {
      const withoutLetters = removeLetters(input);
      setInputValue(withoutLetters);
    } else {
      setInputValue(input);
    }
  }

  function addLetter() {
    if (inputValue.length < 1 || parseInt(inputValue) === 0) {
      setInputValue("1h");
    } else {
      const newInput = inputValue + "h";
      setInputValue(newInput);
    }
  }
  function removeLast() {
    const newInput = removeLetters(inputValue);
    setInputValue(newInput);
  }

  const hasLetters = (str: string) => /[a-zA-Z]/.test(str);
  const removeLetters = (str: string) => {
    return str.replace(/[a-zA-Z]/g, "");
  };

  function addHour() {
    const currentHours = parseInt(inputValue) + 1;
    setInputValue(currentHours.toString() + "h");
  }

  function removeHour() {
    const currentHours = parseInt(inputValue) - 1;
    setInputValue(currentHours.toString() + "h");
  }

  return (
    <div className="w-[300px] flex gap-[10px] h-[70px]">
      <div className="flex flex-col gap-[10px] w-[70px] h-[70px]">
        <div
          onClick={() => addHour()}
          className="bg-g1 h-[30px] w-[100%] flex justify-center items-center text-[23px] font-bold cursor-pointer"
        >
          +
        </div>
        <div
          onClick={() => removeHour()}
          className="bg-g1 h-[30px] w-[100%] flex justify-center items-center text-[23px] font-bold cursor-pointer"
        >
          -
        </div>
      </div>
      <input
        className="w-[220px] h-[100%] bg-g1 text-[25px] flex text-center text-g3"
        value={inputValue}
        onChange={(ev) => changeValue(ev)}
        type="text"
        onFocus={() => removeLast()}
        onBlur={() => addLetter()}
      />
    </div>
  );
}
