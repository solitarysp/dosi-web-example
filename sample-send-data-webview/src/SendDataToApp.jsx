import './style.css';

function SenDataToApp() {
    window.addEventListener("message", message => {
        const data = JSON.parse(message.data)
        alert("Method: " + data.method + ", data: " + data.data)
    });

    async function openNavigate(target) {
        dosiVault.webviewAction("navigate", {
                id: "id",
                data: {target: target}
            }
        );
    }

    async function hideMenu() {
        dosiVault.webviewAction("menuControl", {
                id: "id",
                data: {show: false}
            }
        );
    }

    async function sendDataAppToWebview() {
        dosiVault.webviewAction("test", {
                id: "id",
                data: {
                    "id": "11",
                    "method": "test-app-to-webview",
                    "data": "data test"
                }
            }
        );
    }

    async function showMenu() {
        dosiVault.webviewAction("menuControl", {
                id: "id",
                data: {show: true}
            }
        );
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
        </div>
    )
}

export default SenDataToApp
