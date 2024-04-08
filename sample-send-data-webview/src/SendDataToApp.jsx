import "./style.css";
import { useCallback, useState } from "react";

function SenDataToApp() {
  window.addEventListener("message", (message) => {
    if (message?.data) {
      console.log("Local: " + message.data);
    }
  });

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
        <h5>Required Deeplink List</h5>
        <h5>Preview</h5>
        <br />
        <a
            href={
              "https://app.dosi.world/"
            }
        >
          https://app.dosi.world/
        </a>
        <br />
        <a
            href={
              "https://app.dosi.world/market?test=11"
            }
        >
          https://app.dosi.world/market?test=11
        </a>
        <br />
        <a
            href={
              "https://app.dosi.world/market?open_app=1"
            }
        >
          https://app.dosi.world/market?open_app=1
        </a>
        <br />
        <a
            href={
              "https://app.dosi.world/brand"
            }
        >
          https://app.dosi.world/brand
        </a>
        <br />
        <a
            href={
              "https://app.dosi.world/profile"
            }
        >
          https://app.dosi.world/profile
        </a>
        <br />
        <a
            href={
              "https://app-citizen.store.dosi.world/ko-KR/1st_sale"
            }
        >
          https://app-citizen.store.dosi.world/ko-KR/1st_sale
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
        <br />

        <a
            target="_blank"
            href={
              "https://google.com?openExternalBrowser=1"
            }
        >
          https://google.com?openExternalBrowser=1
        </a>
        <br />
        <a
            href={
              "https://dosi-app-test.thanhlv.com"
            }
        >
          https://dosi-app-test.thanhlv.com
        </a>

        <br />
        <a
            href={
              "https://dosi-app-test.thanhlv.com/dosi?uri_dapps=https://google.com"
            }
        >
          https://dosi-app-test.thanhlv.com/dosi?uri_dapps=https://google.com
        </a>
        <br/>
        <a href={"https://myisod.page.link/qL6j"}>https://myisod.page.link/qL6j</a>
        <br />
        <a
          href={
            "app.dosi://dapp?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com&efr=1"
          }
        >
          Open this page on dosi vault
        </a>
          <br />
        <a href={"https://dosi.page.link/qL6j?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com"}>Open this page by dynamic link</a>
        <br />
        <a href={"https://dosivault.page.link/qL6j"}>https://dosivault.page.link/qL6j</a>
        <br />
        <a href={"https://isod.page.link/Scq6"}>https://isod.page.link/Scq6</a>
        <br />
        <a href={"https://isod.page.link"}>https://isod.page.link</a>
        <br />
        <a href={"https://dosi.page.link/muUh?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com"}>Open this page by dynamic link beta</a>

        <br />
        <a href={"app.dosi://dapp?uri_dapps= http://localhost:5173&efr=1"}>Open this page on dosi vault local</a>
        <br />
        <a href={"https://nid.naver.com/oauth2.0/authorize?client_id=Wq6NfLoV4tXJk2gVvkTM&redirect_uri=https://dosi-members.line-apps-beta.com/api/v2/oauth/callback&response_type=code"}>Test naver logn1</a>
      </div>
      <div>
        <h5>Common navigate</h5>

        <button onClick={() => openNavigate("qrScan")}>Open Scan QR</button>
        <button onClick={() => openNavigate("send")}>Open Send</button>
      </div>
      <div>
        <h5>Flow login logout</h5>
        <button onClick={() => openNavigate("doLogin")}>Do Login</button>
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
          dosiVault.webviewAction("showModal", {"name":"payment"});
        }}>Modal Payment</button>
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
        <input defaultValue={biometricsTestService} onChange={(e) => setBiometricsTestService(e.target.value)} />
        <br />
        password:{" "}
        <input defaultValue={biometricsTestPassword} onChange={(e) => setBiometricsTestPassword(e.target.value)} />
        <br />
        <button onClick={() => biometricsTest("create")}>Create</button>
        <button onClick={() => biometricsTest("verify")}>verify</button>
        <button onClick={() => biometricsTest("check_service_exists")}>check service exists</button>
        <button onClick={() => biometricsTest("delete")}>delete service</button>
      </div>
      <br />
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
      <br />
    </div>
  );
}

export default SenDataToApp;
