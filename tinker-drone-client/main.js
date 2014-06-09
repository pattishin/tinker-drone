/** @jsx React.DOM */
var React = require('react');

var TinkerDroneClient = React.createClass({displayName: 'TinkerDroneClient',
        render: function() {
            return (
                    React.DOM.div( {className:"container theme-showcase"}, 
                        React.DOM.div( {className:"site-wrapper"}, 
                            React.DOM.div( {className:"site-wrapper-inner"}, 
                                React.DOM.div( {className:"cover-container"}, 
                                    React.DOM.div( {id:"main-content", className:"inner cover"}, 
                                        React.DOM.h1( {className:"cover-heading"}, "Tinker Drone Navigation"),
                                        React.DOM.div( {className:"lead"}, "Hello ", this.props.name),
                                        React.DOM.div( {className:"lead"}, 
                                            React.DOM.div(null, 
                                                React.DOM.a( {href:"/start", className:"btn btn-lg btn-default"}, "Drone Take Off!")
                                            ),
                                            React.DOM.div(null,  
                                                React.DOM.a( {href:"/image", className:"btn btn-lg btn-default"}, "Take a picture!")
                                            ) 
                                        ),
                                        React.DOM.div(null, 
                                            React.DOM.img( {src:"/image"})
                                        )
                                    )
                                )
                            )
                        )
                    )
            );
        }
});
 
 React.renderComponent(TinkerDroneClient( {name:"World"} ), document.body);
