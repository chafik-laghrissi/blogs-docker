import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <PostCreate />
      <PostList />
    </div>
  );
}

export default App;
