import { Toaster } from "sonner";
import Layout from "./components/Layout";
import TodoApp from "./components/TodoApp";
import CounterApp from "./components/CounterApp";
import FetchTesting from "./components/FetchTesting";
import SupabaseTesting from "./components/SupabaseTesting";

function App() {
  return (
    <Layout>
      {/* <TodoApp /> */}
      {/* <CounterApp/> */}
      {/* <FetchTesting /> */}
      <SupabaseTesting />
      <Toaster />
    </Layout>
  );
}

export default App;
