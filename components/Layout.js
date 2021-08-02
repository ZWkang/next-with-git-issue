import React from "react";

import "./layout.scss";
class Layout extends React.PureComponent {
  componentDidMount() {
  }
  renderBody = () => {
    const { body } = this.props;
    if (!body) return null;
    return body(this.props);
  };
  renderFooter = () => {
    const { footer } = this.props;
    if (!footer) return null;
    return footer(this.props);
  };
  render() {
    return (
      <div className="focus" tabIndex="-1" role="group">
        <div className="app-wrapper">
          <div className="main-container">{this.renderBody()}</div>
          <div className="footer-container">{this.renderFooter()}</div>
        </div>
      </div>
    );
  }
}
export default Layout;
