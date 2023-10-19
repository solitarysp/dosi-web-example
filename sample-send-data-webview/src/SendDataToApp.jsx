import './style.css';

function SenDataToApp() {
    window.addEventListener("message", message => {
        const data = JSON.parse(message.data)
        alert("Method: " + data.method + ", data: " + data.data)
    });

    async function openNavigate(target) {
        dosiVault.webviewAction("navigate", {
                target: target
            }
        );
    }

    async function hideMenu() {
        const data = await dosiVault.webviewAction("menuControl", {
                show: false
            }
        );
        alert(" data: " + JSON.stringify(data))

    }

    async function sendDataAppToWebview() {
        const data = dosiVault.webviewAction("test", {
                id: "id",
                data: {
                    "name": "dosi vault"
                }
            }
        );
        console.log(data.data.name);
    }

    async function showMenu() {
        const data = await dosiVault.webviewAction("menuControl", {
                show: true
            }
        );
        alert(" data: " + JSON.stringify(data))
    }

    async function openIAB(url) {
       try {
           await dosiVault.webviewAction("openIAB", {
                   url: url
               }
           );
       }catch (e) {
           alert(e.message)
       }
    }

    return (
        <div className="container" style={
            {
                minHeight: 400
            }
        }>
            <h1>Send Data to app & App to webview</h1>
            <div>
                <button onClick={() => openNavigate('qrScan')}>
                    Open Scan QR
                </button>
                <button onClick={() => openNavigate('send')}>
                    Open Send
                </button>
                <button onClick={() => openNavigate('doLogin')}>
                    Do Login
                </button>
                <button onClick={() => openNavigate('creatFNSAeWallet')}>
                    Do Set password
                </button>
            </div>
            <div>
                <button onClick={() => openIAB('https://www.google.com/')}>
                    Open IAB
                </button>
            </div>
            <br/>
            <div>
                <button onClick={hideMenu}>
                    HideMenu
                </button>
                <button onClick={showMenu}>
                    ShowMenu
                </button>
            </div>
            <div>
                <button onClick={sendDataAppToWebview}>
                    Send Data App To webview
                </button>
            </div>
            <br/>
            <a href={'https://dosivault.page.link/qL6j?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com&efr=1'}>
                Open this page on dosi vault
            </a>
            <br/>
            <a href={'https://dosivault.page.link/qL6j?uri_dapps= http://localhost:5173&efr=1'}>
                Open this page on dosi vault local
            </a>
        </div>
    )
}

export default SenDataToApp
