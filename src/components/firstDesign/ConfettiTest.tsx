"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Confetti from "react-dom-confetti";

export type TConfettie = {
  showConfetti: boolean;
  toggleConfettie: () => void;
  setshowConfetti: Dispatch<SetStateAction<boolean>>;
};

export const ConfettieContext = createContext<TConfettie>({
  showConfetti: false,
  toggleConfettie: () => {},
  setshowConfetti: () => {},
});

export function ConfettieProvider({ children }: { children: React.ReactNode }) {
  const [showConfetti, setshowConfetti] = useState(false);
  const ref = useRef<Confetti>(null);
  useEffect(() => {
    setshowConfetti(false);
  }, [showConfetti, setshowConfetti]);
  function toggleConfettie() {
    setshowConfetti((prev) => !prev);
  }

  return (
    <ConfettieContext.Provider
      value={{ setshowConfetti, toggleConfettie, showConfetti }}
    >
      {children}
    </ConfettieContext.Provider>
  );
}
