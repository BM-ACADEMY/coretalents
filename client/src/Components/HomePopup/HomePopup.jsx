import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Popup from "@/assets/Popup/popup.png";
import confetti from "canvas-confetti";

const HomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the popup automatically when the component mounts
    // You can add logic here to check localStorage if you only want to show it once
    // const hasSeenPopup = localStorage.getItem('hasSeenHomePopup');
    // if (!hasSeenPopup) {
    const timer = setTimeout(() => {
      setIsOpen(true);
      // localStorage.setItem('hasSeenHomePopup', 'true');
      // Trigger confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
      };

      const random = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    }, 1000); // Small delay for better UX
    return () => clearTimeout(timer);
    // }
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            <Link to="/chennai-banking-jobs" className="block w-full h-full">
              <img
                src={Popup}
                alt="Special Offer"
                className="w-full h-full object-cover sm:rounded-lg"
              />
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HomePopup;
