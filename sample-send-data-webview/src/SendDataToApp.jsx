import "./style.css";
import {useCallback, useState} from "react";
import {ethers} from "ethers";

function SenDataToApp() {
    // window.addEventListener("message", (message) => {
    //   if (message?.data) {
    //     console.log("Local: " + message.data);
    //   }
    // });
    window.addEventListener("dosiapp_eth_keystorechange", (message) => {
        console.log("dosiapp_eth_keystorechange: " + JSON.stringify(message));

    });
    const kaỉAPovider = window.kaia;
  try {
      window.testKaiaDosiProvider = new ethers.providers.Web3Provider(
          window.kaia
      );
  }catch (e) {

  }

    async function openNavigate(target, parameter) {
        if (parameter) {
            dosiVault.webviewAction("navigate", {
                target: target,
                data: parameter,
            });
        } else {
            dosiVault.webviewAction("navigate", {
                target: target,
            });
        }
    }

    async function webviewAction(target, parameter) {
        dosiVault.webviewAction(target,parameter);
    }

    async function hideMenu() {
        const data = await dosiVault.webviewAction("menuControl", {
            show: false,
        });
        alert(" data: " + JSON.stringify(data));
    }

    async function sendDataAppToWebview() {
        const data = dosiVault.webviewAction("test", {
            id: "id",
            data: {
                name: "dosi vault",
            },
        });
        console.log(data.data.name);
    }

    async function showMenu() {
        const data = await dosiVault.webviewAction("menuControl", {
            show: true,
        });
        alert(" data: " + JSON.stringify(data));
    }

    async function openIAB(url) {
        try {
            await dosiVault.webviewAction("openIAB", {
                url: url,
            });
        } catch (e) {
            alert(e.message);
        }
    }

    async function logout() {
        try {
            await dosiVault.webviewAction("logout", {});
        } catch (e) {
            alert(e.message);
        }
    }

    async function unlock() {
        try {
            console.log("Start unlock");
            const result = await dosiVault.webviewAction("unlock", {});
            console.log("Unlock Status: " + result);
        } catch (e) {
            console.log("Error unlock");
        }
    }

    const [biometricsTestService, setBiometricsTestService] = useState("service_1");
    const [biometricsTestPassword, setBiometricsTestPassword] = useState("password_1");

    const biometricsTest = useCallback(
        async (method) => {
            try {
                if (method === "create") {
                    console.log(biometricsTestPassword);
                    await dosiVault.webviewAction("test", {
                        method: "create",
                        service: biometricsTestService,
                        password: biometricsTestPassword,
                    });
                }
                if (method === "verify") {
                    console.log(biometricsTestPassword);
                    await dosiVault.webviewAction("test", {
                        method: "verify",
                        service: biometricsTestService,
                    });
                }
                if (method === "check_service_exists") {
                    console.log(biometricsTestPassword);
                    await dosiVault.webviewAction("test", {
                        method: "check_service_exists",
                        service: biometricsTestService,
                    });
                }
                if (method === "delete") {
                    console.log(biometricsTestPassword);
                    await dosiVault.webviewAction("test", {
                        method: "delete",
                        service: biometricsTestService,
                    });
                }
            } catch (e) {
                console.log("Error unlock");
            }
        },
        [biometricsTestService, biometricsTestPassword]
    );

    async function changeUserLanguage() {
        await dosiVault.webviewAction("changeLanguage", {});
    }

    async function changeUserCurrency() {
        await dosiVault.webviewAction("changeCurrency", {});
    }

    return (
        <div
            className="container"
            style={{
                minHeight: 400,
            }}
        >

            <div>
                <h5>Kaia</h5>
                <a href={window.location.href} target="_blank">Open this page for new window</a>
                <br/>
                <a href={`app.dosi://dapp?uri_dapps=${window.location.href}`} target="_blank">Open this page on dosi app</a>
                <br/>
                <a href="app.dosi://closeIAB" target="_blank">Close IAB</a>
                <br/>
                <button onClick={() => openNavigate("returnKaia")}>Open return Kaia</button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        window.kaia
                    );
                    const data = await provider.send("eth_getTransactionByHash", [
                        "0xdc7aea1a419721bf893e6e3ad9185b20e37c4e75ad0a85e021cca4f1c65f5b41",
                    ]);
                    console.log(data);

                }}>eth_getTransactionByHash
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    const data = await provider.send("eth_chainId");
                    console.log(data);

                }}>eth_chainId
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    const data = await provider.send("eth_getTransactionReceipt", [
                        "0xdc7aea1a419721bf893e6e3ad9185b20e37c4e75ad0a85e021cca4f1c65f5b41",
                    ]);
                    console.log(data);

                }}>eth_getTransactionReceipt
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        window.kaia
                    );
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const tx = {
                        to: "0x55c59eeee480df68f88b106ee54d15a14c6ef951",
                        value: ethers.utils.parseEther("0.1"),
                    };

                    try {
                        const txResponse = await signer.sendTransaction(tx);
                        console.log("Transaction hash:" + txResponse.hash);

                        const receipt = await txResponse.wait();
                        console.log(
                            "Transaction confirmed in block:" + receipt.blockNumber
                        );
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>Send coin eth Provider
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        window.kaia
                    );
                    await provider.send("eth_requestAccounts", []);

                    try {
                        const signer = provider.getSigner();
                        const contractAddress =
                            "0xac7960b088c97c27f7aaa7ffe65d9e863919173c";
                        const contractABI = IKIP17;
                        const contract = new ethers.Contract(
                            contractAddress,
                            contractABI,
                            signer
                        );

                        // Gọi hàm get
                        const value = await contract.symbol();
                        console.log("done symbol ");
                        console.log("Value from contract:", value.toString());
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>Send call query smart contract Provider
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    await provider.send("eth_requestAccounts", []);

                    try {
                        const signer = provider.getSigner();
                        // Địa chỉ và ABI của contract
                        const contractAddress =
                            "0x549f5d8cc0d26f42c5938c2349e6bca08c435f83";
                        const contractABI = COUNTBAPP_ABI;
                        const contract = new ethers.Contract(
                            contractAddress,
                            contractABI,
                            signer
                        );

                        // call transaction
                        const transaction = await contract.plus();
                        console.log("plus " + JSON.stringify(transaction));
                        console.log("wait ");
                        const transactionReceipt =  await transaction.wait();
                        console.log("transactionReceipt: ",transactionReceipt);

                        if(transactionReceipt.status === 1) {
                            console.log("TX thanh cong");
                        }else {
                            console.log("TX that bai");
                        }


                        // call query
                        const count = await contract.count();
                        console.log("count " + count);
                    } catch (error) {
                        console.log("Error:" + error.message);
                    }

                }}>Send call countApp transaction smart contract Provider
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    await provider.send("eth_requestAccounts", []);

                    try {
                        const signer = provider.getSigner();
                        // Địa chỉ và ABI của contract
                        const contractAddress =
                            "0x44c71b462c06b8e09f35c0b7e577ef99b0cbf992";
                        const contractABI = PAYMENT_ABI;
                        const contract = new ethers.Contract(
                            contractAddress,
                            contractABI,
                            signer
                        );

                        // call transaction
                        const plus = await contract.pay(
                            '1231231312321', // _paymentId
                            [   // _payments
                                {
                                    recipient: '0x636271c78ad47b4311e6d012a37b450ce1574b95', // to 01
                                    amount: '18375305950000000000' // amount 01
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                },
                                {
                                    recipient: '0x392e024f1bd2f40e153972ebd36cd0a2e81267db', // to 02
                                    amount: '18375305950000000000' // amount 02
                                }
                            ],
                            158333278, // _blockNumberThreshold,
                        );
                        console.log("plus " + JSON.stringify(plus));
                        console.log("count " + count);
                    } catch (error) {
                        console.log("Error:" + error.message);
                    }

                }}>Send call payment transaction smart contract Provider
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    await provider.send("eth_requestAccounts", []);

                    try {
                        const signer = provider.getSigner();
                        // Địa chỉ và ABI của contract
                        const contractAddress =
                            "0x44c71b462c06b8e09f35c0b7e577ef99b0cbf992";
                        const contractABI = PAYMENT_ABI;
                        const contract = new ethers.Contract(
                            contractAddress,
                            contractABI,
                            signer
                        );

                        // call transaction
                        const plus = await contract.estimateGas.pay(
                            '1231231312321', // _paymentId
                            [   // _payments
                                {
                                    recipient: '0x96db6a7498BD71dF8a1c19B7cb3DD16dfb6f5D54', // to 01
                                    amount: '20000000000000000' // amount 01
                                },
                                {
                                    recipient: '0x62a0C1a7814c4fb8DA1d3B83A4DEC6Fb235400c8', // to 02
                                    amount: '10000000000000000' // amount 02
                                },
                            ],
                            123123, // _blockNumberThreshold
                        );
                        console.log("plus " + JSON.stringify(plus));
                        console.log("count " + count);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>Send call payment transaction ET gasg smart contract Provider
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    await provider.send("eth_requestAccounts", []);
                    try {
                        const signer = provider.getSigner();

                        const message = await signer.signMessage("lv00212")
                        console.log("message " + message);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>Sign Message
                </button>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    const address = await provider.send("eth_requestAccounts", []);
                    try {
                        const Balance = await provider.send("eth_getBalance", [address[0]]);

                        console.log("eth_getBalance " + Balance);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>eth_getBalance
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    try {
                        const result = await provider.send("eth_accounts", []);
                        console.log("eth_accounts " + result);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>eth_accounts
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    try {
                        const result = await provider.send("eth_defaultAccount", []);
                        console.log("eth_defaultAccount " + result);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>eth_defaultAccount
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    try {
                        const result = await provider.send("eth_changeDefaultWallet", ["0x55C59Eeee480dF68f88B106eE54d15a14C6eF951"]);
                        console.log("eth_changeDefaultWallet " + result);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>eth_changeDefaultWallet 0x55C59Eeee480dF68f88B106eE54d15a14C6eF951
                </button>
                <br/>
                <button onClick={async () => {
                    const provider = new ethers.providers.Web3Provider(
                        kaỉAPovider
                    );
                    try {
                        const result = await provider.send("eth_changeDefaultWallet", ["0xC120E2DC1348a0Ef8B910e9037A9352cc6646b25"]);
                        console.log("eth_changeDefaultWallet " + result);
                    } catch (error) {
                        console.log("Error:" + error);
                    }

                }}>eth_changeDefaultWallet 0xC120E2DC1348a0Ef8B910e9037A9352cc6646b25
                </button>
                <br/>
                <button onClick={async () => {
                    openNavigate("importKaiaWallet")

                }}>Open Import KAIA Private key
                </button>
                <br/>
                <button onClick={async () => {
                    openNavigate("switchAccountKaia")

                }}>switch Account Kaia for payment
                </button>
                <br/>
                <button onClick={async () => {
                    openNavigate("walletAddressListKaia")

                }}>wallet Address List Kaia
                </button>
                <br/>
                <button onClick={async () => {
                    openNavigate("SwapToKaia")

                }}>Swap To Kaia
                </button>
                <br/>
                <a
                    href={
                        "https://app-links.dosi.world/?targetUrl=https%3A%2F%2Fdosi-profile.line-apps-beta.com%2Fapp%2Fswap-kaia&openStore=0"
                    }
                >
                    Swap Kaia beta deeplink
                </a>
                <br/>
                <a
                    href={
                        "https://nid.naver.com/"
                    }
                    target={"_blank"}
                >
                    https://nid.naver.com/
                </a>
                <br/>
                <br/>

                <a
                    href={
                        "https://links.dosi.world/?openStore=1&targetUrl=https://dosi.world/market"
                    }
                >
                    https://links.dosi.world/?openStore=1&targetUrl=https://dosi.world/market ===> Open the appstore if
                    the app is not installed
                </a>
            </div>

            <div>
                <h5>Required Deeplink List</h5>
                <br/>
                <a
                    href={
                        "https://app-links.dosi.world/?targetUrl=https%3A%2F%2Fdosi-profile.line-apps-beta.com%2Faccount%2Fseller-information&openStore=0"
                    }
                >
                    https://app-links.dosi.world/?targetUrl=https%3A%2F%2Fdosi-profile.line-apps-beta.com%2Faccount%2Fseller-information&openStore=0
                </a>

            </div>

            <div>
                <h5>Open app from depplink</h5>

                <a
                    target="_blank"
                    href={
                        "https://google.com"
                    }
                >
                    Open IAB Google
                </a>
                <br/>

                <a
                    target="_blank"
                    href={
                        "https://google.com?openExternalBrowser=1"
                    }
                >
                    https://google.com?openExternalBrowser=1
                </a>
                <br/>
                <a
                    href={
                        "https://links.dosi.world"
                    }
                >
                    https://links.dosi.world
                </a>

                <br/>
                <a
                    href={
                        "https://links.dosi.world/dosi?uri_dapps=https://google.com"
                    }
                >
                    https://links.dosi.world/dosi?uri_dapps=https://google.com
                </a>
                <br/>
                <a href={"https://myisod.page.link/qL6j"}>https://myisod.page.link/qL6j</a>
                <br/>
                <a
                    href={
                        "app.dosi://dapp?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com&efr=1"
                    }
                >
                    Open this page on dosi vault
                </a>
                <br/>
                <a href={"https://dosi.page.link/qL6j?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com"}>Open
                    this page by dynamic link</a>
                <br/>
                <a href={"https://dosivault.page.link/qL6j"}>https://dosivault.page.link/qL6j</a>
                <br/>
                <a href={"https://isod.page.link/Scq6"}>https://isod.page.link/Scq6</a>
                <br/>
                <a href={"https://isod.page.link"}>https://isod.page.link</a>
                <br/>
                <a href={"https://dosi.page.link/muUh?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com"}>Open
                    this page by dynamic link beta</a>

                <br/>
                <a href={"app.dosi://dapp?uri_dapps= http://localhost:5173&efr=1"}>Open this page on dosi vault
                    local</a>
                <br/>
                <a href={"https://nid.naver.com/oauth2.0/authorize?client_id=Wq6NfLoV4tXJk2gVvkTM&redirect_uri=https://dosi-members.line-apps-beta.com/api/v2/oauth/callback&response_type=code"}>Test
                    naver logn1</a>
            </div>
            <div>
                <h5>Common navigate</h5>

                <button onClick={() => openNavigate("qrScan")}>Open Scan QR</button>
                <button onClick={() => openNavigate("send")}>Open Send</button>
            </div>
            <div>
                <h5>Flow login logout</h5>
                <button onClick={() => openNavigate("doLogin")}>Do Login</button>
                <button onClick={() => openNavigate("doLogin", {redirectTarget: "home"})}>Do Login redirectTarget home</button>
                <button onClick={() => webviewAction("login-sns")}>login-sns</button>
                <button onClick={() => webviewAction("login-sns",{redirectTarget: "home"})}>login-sns redirectTarget home</button>
                <button onClick={() => openNavigate("createFNSAWallet")}>Do Set password</button>
                <button onClick={() => openNavigate("ShareDMnemonicReveal")}>ShareD</button>
                <button onClick={() => openIAB("https://www.google.com/")}>Open IAB</button>
                <button onClick={() => logout()}>Logout</button>
                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("noSession", {
                            currentUrl: "https://dosi-members.line-apps-alpha.com",
                        });
                        console.log(result);
                    }}
                >
                    Reqeust cookie
                </button>
                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("verifyPhone");
                        console.log(result);
                    }}
                >
                    verifyPhone
                </button>
                <button
                    onClick={async () => {
                        window.location.href = "app.dosi.oauth://login";
                    }}
                >
                    Test login app.dosi.oauth :
                </button>
                <button
                    onClick={async () => {
                        window.location.href = "app.dosi://qrLogin?state=H7c4-GUzqfpcWo045IZO6UauVCGIKbSvfHMDQ8gnCb0";
                    }}
                >
                    QR login web PC
                </button>
            </div>
            <div>
                <h5>Main navigate deeplink</h5>
                <a href={"app.dosi:navigation?navigation=profile-my-info"}>Profile account</a>

            </div>
            <div>
                <h5>Main navigate</h5>
                <button onClick={() => openNavigate("home")}>MENU HOME</button>
                <button onClick={() => openNavigate("brand")}>MENU BRAND</button>
                <button onClick={() => openNavigate("market")}>MENU MARKET</button>
                <button onClick={() => openNavigate("notice")}>MENU NOTICE</button>
                <button onClick={() => openNavigate("profile")}>MENU PROFILE</button>
                <button onClick={() => openNavigate("staking")}>Staking</button>
                <button onClick={() => openNavigate("walletAddressBook")}>WalletAddressBook</button>
                <button onClick={() => openNavigate("walletAddressList")}>WalletAddressList</button>
                <button onClick={() => openNavigate("notificationSettings")}>NotificationSettings</button>
                <button onClick={() => openNavigate("notification")}>Notification</button>
                <button onClick={() => openNavigate("setting")}>Setting</button>
                <button onClick={() => openNavigate("about")}>About</button>
                <button onClick={() => openNavigate("help")}>Help</button>
                <button onClick={() => openNavigate("deleteAccount")}>DeleteAccount</button>
                <button onClick={() => openNavigate("security")}>Security</button>
                <button onClick={() => openNavigate("send")}>Send</button>
                <button onClick={() => openNavigate("receive")}>Receive</button>
                <button onClick={() => {
                    dosiVault.webviewAction("showModal", {"name": "payment"});
                }}>Modal Payment
                </button>
                <button
                    onClick={() =>
                        openNavigate("charge", {
                            exchangeId: "BITMAX",
                            coinType: "FNSA",
                            walletAddress: "link1fwadqlcn3jre04jfrlxy9vpl583dydqwwrvjxj",
                        })
                    }
                >
                    Charge
                </button>

                <a href={"https://isod.page.link/Scq6?uri_dapps=https://google.com"}>Payment deeplink dynamic</a>
                <br/>
                <a href={"app.dosi://dapp?uri_dapps=https://google.com"}>Payment deeplink</a>
            </div>
            <div>
                <h5>KeyRing</h5>

                <button onClick={() => unlock()}>Unlock</button>

                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("getKeyRingStatus");
                        console.log("getKeyRingStatus: " + result);
                    }}
                >
                    getKeyRingStatus
                </button>
            </div>
            <div>
                <h5>Phone verify</h5>

                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("phoneVerifyEnterPassword");
                        console.log("phoneVerifyEnterPassword: " + result);
                    }}
                >
                    phoneVerifyEnterPassword
                </button>
                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("phoneVerifyLogoutAndLogin");
                        console.log("phoneVerifyLogoutAndLogin: " + result);
                    }}
                >
                    phoneVerifyLogoutAndLogin
                </button>
            </div>
            <div>
                <h5>Wallet address</h5>

                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("getDefaultWallet");
                        console.log("phoneVerifyEnterPassword: " + result);
                    }}
                >
                    getDefaultWallet
                </button>
                <button
                    onClick={async () => {
                        const result = await dosiVault.webviewAction("updateDefaultWallet", {
                            value: "link1r2jrwejhk7wkhnl2arty572pj7nw6wzv08040u"
                        });
                        console.log("phoneVerifyLogoutAndLogin: " + result);
                    }}
                >
                    updateDefaultWallet
                </button>
            </div>
            <div>
                <h5>Biometrics test</h5>
                Service:{" "}
                <input defaultValue={biometricsTestService} onChange={(e) => setBiometricsTestService(e.target.value)}/>
                <br/>
                password:{" "}
                <input defaultValue={biometricsTestPassword}
                       onChange={(e) => setBiometricsTestPassword(e.target.value)}/>
                <br/>
                <button onClick={() => biometricsTest("create")}>Create</button>
                <button onClick={() => biometricsTest("verify")}>verify</button>
                <button onClick={() => biometricsTest("check_service_exists")}>check service exists</button>
                <button onClick={() => biometricsTest("delete")}>delete service</button>
            </div>
            <br/>
            <div>
                <h5>Menu Control</h5>
                <button onClick={hideMenu}>HideMenu</button>
                <button onClick={showMenu}>ShowMenu</button>
            </div>
            <div>
                <h5>User Language & Currency</h5>
                <button onClick={changeUserLanguage}>Change User Language</button>
                <button onClick={changeUserCurrency}>Change User Currency</button>
            </div>
            <div>
                <h5>Send generic data to App</h5>
                <button onClick={sendDataAppToWebview}>Send Data App To webview</button>
            </div>
            <br/>
        </div>
    );
}

export const IKIP17 = [
    {
        constant: true,
        inputs: [{name: "interfaceId", type: "bytes4"}],
        name: "supportsInterface",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "tokenId", type: "uint256"}],
        name: "getApproved",
        outputs: [{name: "", type: "address"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
        ],
        name: "approve",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "from", type: "address"},
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
        ],
        name: "transferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {name: "owner", type: "address"},
            {name: "index", type: "uint256"},
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
        ],
        name: "mint",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "from", type: "address"},
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
        ],
        name: "safeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{name: "tokenId", type: "uint256"}],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "account", type: "address"}],
        name: "isPauser",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "index", type: "uint256"}],
        name: "tokenByIndex",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
            {name: "tokenURI", type: "string"},
        ],
        name: "mintWithTokenURI",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "tokenId", type: "uint256"}],
        name: "ownerOf",
        outputs: [{name: "", type: "address"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renouncePauser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "owner", type: "address"}],
        name: "balanceOf",
        outputs: [{name: "", type: "uint256"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{name: "account", type: "address"}],
        name: "addPauser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{name: "account", type: "address"}],
        name: "addMinter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceMinter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "to", type: "address"},
            {name: "approved", type: "bool"},
        ],
        name: "setApprovalForAll",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "account", type: "address"}],
        name: "isMinter",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {name: "from", type: "address"},
            {name: "to", type: "address"},
            {name: "tokenId", type: "uint256"},
            {name: "_data", type: "bytes"},
        ],
        name: "safeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{name: "tokenId", type: "uint256"}],
        name: "tokenURI",
        outputs: [{name: "", type: "string"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {name: "owner", type: "address"},
            {name: "operator", type: "address"},
        ],
        name: "isApprovedForAll",
        outputs: [{name: "", type: "bool"}],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {name: "name", type: "string"},
            {name: "symbol", type: "string"},
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [{indexed: false, name: "account", type: "address"}],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{indexed: false, name: "account", type: "address"}],
        name: "Unpaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{indexed: true, name: "account", type: "address"}],
        name: "PauserAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{indexed: true, name: "account", type: "address"}],
        name: "PauserRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{indexed: true, name: "account", type: "address"}],
        name: "MinterAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{indexed: true, name: "account", type: "address"}],
        name: "MinterRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {indexed: true, name: "from", type: "address"},
            {indexed: true, name: "to", type: "address"},
            {indexed: true, name: "tokenId", type: "uint256"},
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {indexed: true, name: "owner", type: "address"},
            {indexed: true, name: "approved", type: "address"},
            {indexed: true, name: "tokenId", type: "uint256"},
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {indexed: true, name: "owner", type: "address"},
            {indexed: true, name: "operator", type: "address"},
            {indexed: false, name: "approved", type: "bool"},
        ],
        name: "ApprovalForAll",
        type: "event",
    },
];
export const COUNTBAPP_ABI = [
    {
        constant: true,
        inputs: [],
        name: "count",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "lastParticipant",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "minus",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "plus",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const PAYMENT_ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
        ],
        name: "ExceededBlockNumberThreshold",
        type: "error",
    },
    {
        inputs: [],
        name: "PaymentFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "PaymentFailedWithIllegalAmount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "UsedHash",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "paymentId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "address payable",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct IPaymentSplitter.Payment[]",
                name: "payment",
                type: "tuple[]",
            },
        ],
        name: "Paid",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_paymentId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "address payable",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                internalType: "struct IPaymentSplitter.Payment[]",
                name: "_payments",
                type: "tuple[]",
            },
            {
                internalType: "uint256",
                name: "_blockNumberThreshold",
                type: "uint256",
            },
        ],
        name: "pay",
        outputs: [
            {
                internalType: "bytes32",
                name: "paymentHash",
                type: "bytes32",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "used",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];


export default SenDataToApp;
