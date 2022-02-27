import "./App.css";
import Header from "./components/Header";
import AddStudent from "./components/AddStudent";
import AllStudents from "./components/AllStudents";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/add" exact component={AddStudent} />
        <Route path="/" exact component={AllStudents} />
      </div>
    </Router>
  );
}

export default App;
