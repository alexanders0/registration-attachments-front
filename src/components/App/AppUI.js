import { Header } from "../Header"
import { Footer } from "../Footer"
import { RequirementsList } from "../RequirementsList"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function AppUI() {
  return (
    <Router basename='/repo-name'>
      <Header />
      <Switch>
        <Route path="/:encodedUrl" children={<RequirementsList />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export { AppUI }
