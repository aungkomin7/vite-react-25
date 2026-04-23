import { RxReset } from "react-icons/rx";
import { useCounterStore } from "../stores/useCounterStore";

const CounterResetBtn = () => {
  const { reset } = useCounterStore();
  const resetBtn = () => {
    reset();
  };
  return (
    <RxReset
      onClick={resetBtn}
      className=" cursor-pointer active:scale-95 text-red-500 w-16 h-8"
    />
  );
};

export default CounterResetBtn;
