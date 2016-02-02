const React = require("react");

const ConnectedStore = require("./ConnectedStore");

function MakeConnectedComponent(ViewComponent, store, ...propNames) {
	
	class ConnectedComponent extends React.Component {
		render() {
			return (
				<ConnectedStore store={store} propNames={propNames}>
		    		{propValues => <ViewComponent {...propValues} {...this.props} />}
		    	</ConnectedStore>
		    );
		}
	}
	return ConnectedComponent;
};

module.exports = MakeConnectedComponent;