/** @jsx React.DOM */
var React = require('react');

var Hello = React.createClass({
        render: function() {
            return (
                <div>
                    <div>Hello {this.props.name}</div>
                    <input type="submit" onclick="window.location='/start';">
                        Drone Take Off!
                    </input> 
                </div>
            );
        }
});
 
 React.renderComponent(<Hello name="World" />, document.body);
