import { Button } from "antd";

import "./TopNav.scss";

const TopNav = ({ address, connect }) => {
  return (
    <div className="partial-top-nav">
      <div
        style={{ width: "50%", textAlign: "left", paddingLeft: "25px" }}
      ></div>
      <div style={{ width: "50%", textAlign: "right" }}>
        {!address && <Button onClick={connect}>Connect Wallet</Button>}
      </div>
    </div>
  );
};

export default TopNav;
