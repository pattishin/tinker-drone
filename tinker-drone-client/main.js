/** @jsx React.DOM */
var React = require('react');

var Hello = React.createClass({displayName: 'Hello',
        render: function() {
            return (
                React.DOM.div(null, 
                    React.DOM.div(null, "Hello ", this.props.name),
                    React.DOM.div(null, 
                        React.DOM.a( {href:"/start"}, 
                            "Drone Take Off!"
                        )
                    ),
                    React.DOM.div(null,  
                        React.DOM.a( {href:"/image"}, 
                            "Take a picture!"
                        )
                    ) 
                )
            );
        }
});
 
 React.renderComponent(Hello( {name:"World"} ), document.body);
