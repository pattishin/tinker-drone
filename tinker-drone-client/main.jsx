/** @jsx React.DOM */
var React = require('react');

var TinkerDroneClient = React.createClass({
        render: function() {
            return (
                    <div className="container theme-showcase">
                        <div className="site-wrapper">
                            <div className="site-wrapper-inner">
                                <div className="cover-container">
                                    <div id="main-content" className="inner cover">
                                        <h1 className="cover-heading">Tinker Drone Navigation</h1>
                                        <div className="lead">Hello {this.props.name}</div>
                                        <div className="lead">
                                            <div>
                                                <a href="/start" className="btn btn-lg btn-default">Drone Take Off!</a>
                                            </div>
                                            <div> 
                                                <a href="/image" className="btn btn-lg btn-default">Take a picture!</a>
                                            </div> 
                                        </div>
                                        <div>
                                            <img src="/image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
});
 
 React.renderComponent(<TinkerDroneClient name="World" />, document.body);
