/** @jsx React.DOM */
var React = require('react');

var TinkerDroneClient = React.createClass({
        render: function() {
            var mainContentStyle = {
                    textAlign: 'center'
                },
                imageStyle = {
                    width: '100%', 
                    height: 'auto'
                };

            return (
                    <div className="container theme-showcase">
                        <div className="site-wrapper">
                            <div className="site-wrapper-inner">
                                <div className="cover-container">
                                    <div id="main-content" className="inner cover" style={mainContentStyle}>
                                        <h1 className="cover-heading">Tinker Drone Navigation</h1>
                                        <div className="lead">Hello {this.props.name}</div>
                                        <div className="lead">
                                            <span>
                                                <a href="/start" className="btn btn-lg btn-default">Drone Take Off!</a>
                                            </span>
                                            <span> 
                                                <a href="/image" className="btn btn-lg btn-default">Take a picture!</a>
                                            </span> 
                                        </div>
                                        <div className="thumbnail" style={imageStyle}>
                                            <img src="/get-drone-image"/>
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
