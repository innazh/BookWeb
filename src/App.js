import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import AddBook from "./components/AddBook/AddBook";
import BookDetail from "./components/BookDetail/BookDetail";
import Books from "./components/Books/Books";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/signup" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/signin" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/books" exact={true}>
              <Books />
            </Route>
            <Route path="/books/:id" exact={true}>
              <BookDetail />
            </Route>
            <Route path="/addbook" exact={true}>
              <AddBook />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
