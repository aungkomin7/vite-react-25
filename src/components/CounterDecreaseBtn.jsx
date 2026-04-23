import { FaMinus } from "react-icons/fa";
import { useCounterStore } from "../stores/useCounterStore";

const CounterDecreaseBtn = () => {
  const { decrease ,count } = useCounterStore();
  const decreaseBtn = () => {
    if (count === 0) return;
    decrease();
  };
  return (
    <FaMinus
      onClick={decreaseBtn}
      className=" cursor-pointer active:scale-95 text-blue-500 w-16 h-8"
    />
  );
};

export default CounterDecreaseBtn;
