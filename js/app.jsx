const React = require("react");

const App = require("./components/App");

window.onload = () => {
  React.render(<App/>,document.querySelector("#root"));
}