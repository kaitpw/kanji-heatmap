import "./App.css";
import {
  ListScreen,
  VennDiagramScreen,
  NetworkGraphScreen,
  GroupsScreen,
} from "@/screens";
import { Link, Route, Switch } from "wouter";

const App = () => (
  <>
    <div className="space-x-6 font-bold underline">
      <Link href="/list">List</Link>
      <Link href="/frequency-venn-diagram">Frequency Venn Diagram</Link>
      <Link href="/dependency-network-graph">Dependency Network Graph</Link>
      <Link href="/grouped-by-onyomi">Grouped by Onyomi</Link>
    </div>
    {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
    <Switch>
      <Route path="/list" component={ListScreen} />
      <Route path="/frequency-venn-diagram" component={VennDiagramScreen} />
      <Route path="/dependency-network-graph" component={NetworkGraphScreen} />
      <Route path="/grouped-by-onyomi" component={GroupsScreen} />
      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App;
