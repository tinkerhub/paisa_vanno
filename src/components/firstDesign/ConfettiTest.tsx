"use client";

import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

function Example() {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true));

  return (
    <div className="">
      <button
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow "
        onClick={() => setShowConfetti(!showConfetti)}
      >
        Pottikkeda!
        <Confetti
          active={showConfetti}
          config={{ elementCount: 800, spread: 490 }}
        />
      </button>
    </div>
  );
}

export default Example;
