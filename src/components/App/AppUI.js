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
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        {/* <Route path={process.env.PUBLIC_URL + '/:encodedUrl'} children={<RequirementsList />} /> */}
        <Route path="/:encodedUrl" children={<RequirementsList />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export { AppUI }
