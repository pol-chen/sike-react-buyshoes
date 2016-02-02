const React = require("react");

const App = require("./components/App");
const LoggingService = require("./LoggingService");

window.onload = () => {
	LoggingService.enableLogging();
	React.render(<App/>,document.querySelector("#root"));
}