import TodoList from "./features/TodoList.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
