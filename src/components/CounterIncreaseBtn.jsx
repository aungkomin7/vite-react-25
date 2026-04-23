import { FaPlus } from "react-icons/fa";
import { useCounterStore } from "../stores/useCounterStore";

const CounterIncreaseBtn = () => {
  const { increase } = useCounterStore();
  const increaseBtn = () => {
    increase();
  };
  return (
    <FaPlus
      onClick={increaseBtn}
      className=" cursor-pointer active:scale-95 text-green-500 w-16 h-8"
    />
  );
};

export default CounterIncreaseBtn;
