import CounterIncreaseBtn from "./CounterIncreaseBtn";
import CounterDecreaseBtn from "./CounterDecreaseBtn";
import CounterResetBtn from "./CounterResetBtn";
import { useCounterStore } from "../stores/useCounterStore";

const CounterApp = () => {
  const {count}= useCounterStore();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center mb-10 font-bold">CounterApp</h1>
      <div className="flex flex-col items-center">
        <p className="text-5xl mb-5 font-mono">{count}</p>
        <div className="flex items-center gap-x-10">
          <CounterDecreaseBtn />
          <CounterResetBtn />
          <CounterIncreaseBtn />
        </div>
      </div>
    </div>
  );
};

export default CounterApp;
