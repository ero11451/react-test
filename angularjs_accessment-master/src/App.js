import styles from './App.module.css';
import {
  Home,
  UserDetail
} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AngularContextProvider from "./AngularContext";

function App() {
  return (
    <div className={`${styles.app} pb-8`}>
      <AngularContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path="/angular-collaborator/:userName" element={<UserDetail />} />
          </Routes>
        </Router>
      </AngularContextProvider>
    </div>
  );
}

export default App;
