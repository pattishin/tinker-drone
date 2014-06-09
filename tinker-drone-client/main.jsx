/** @jsx React.DOM */
var React = require('react');

var Hello = React.createClass({
        render: function() {
            return (
                <div>
                    <div>Hello {this.props.name}</div>
                    <div>
                        <a href="/start">
                            Drone Take Off!
                        </a>
                    </div>
                    <div> 
                        <a href="/image">
                            Take a picture!
                        </a>
                    </div> 
                </div>
            );
        }
});
 
 React.renderComponent(<Hello name="World" />, document.body);
