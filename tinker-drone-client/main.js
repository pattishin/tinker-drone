/** @jsx React.DOM */
var React = require('react');

var Hello = React.createClass({displayName: 'Hello',
        render: function() {
            return (
                React.DOM.div(null, 
                    React.DOM.div(null, "Hello ", this.props.name),
                    React.DOM.input( {type:"submit", onclick:"window.location='/start';"}, 
                        "Drone Take Off!"
                    ) 
                )
            );
        }
});
 
 React.renderComponent(Hello( {name:"World"} ), document.body);
