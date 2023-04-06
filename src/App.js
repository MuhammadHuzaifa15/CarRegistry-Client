import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { carRegistryAbi, contractAddress } from "./config";
import { Layout, notification } from "antd";
import TopNav from "./components/TopNav/TopNav";

import "./App.scss";
import PageLoading from "./components/PageLoading/PageLoading";
import PageContent from "./components/Content/Content";

const { Header, Footer, Content } = Layout;

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");

  const [api, contextHolder] = notification.useNotification();

  const connectContract = async () => {
    const ABI = carRegistryAbi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setContract(new ethers.Contract(contractAddress, ABI, signer));
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        const [address] = res;
        setAddress(address);
      });
    } else {
      alert("install metamask extension!!");
    }
  };

  useEffect(() => {
    connectContract();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div
          className="container"
          style={{
            transition: "padding-left 0.2s",
          }}
        >
          <TopNav address={address} connect={connectWallet} />
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div id="child-content">
          {contextHolder}
          {!!address ? (
            <PageContent contract={contract} api={api} />
          ) : (
            <PageLoading />
          )}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
        }}
      >
        Car Registry Created by Muhammad Huzaifa
      </Footer>
    </Layout>
  );
}

export default App;
