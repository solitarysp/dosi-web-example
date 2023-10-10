import './style.css';

function SenDataToApp() {
    window.addEventListener("message", message => {
        const data = JSON.parse(message.data)
        alert("Method: " + data.method + ", data: " + data.data)
    });

    async function openNavigate(target) {
        var data = JSON.stringify(
            {
                "method": "navigate",
                "data": {
                    "target": target
                }
            }
        );
        window.ReactNativeWebView?.postMessage(data)
    }

    async function hideMenu() {
        var data = JSON.stringify(
            {
                "method": "menu_control",
                "data": {
                    "show": false
                }
            }
        );
        window.ReactNativeWebView?.postMessage(data)
    }

    async function sendDataAppToWebview() {
        var data = JSON.stringify(
            {
                "method": "sendDataAppToWebview",
                "data": false

            }
        );
        window.ReactNativeWebView?.postMessage(data)
    }

    async function showMenu() {
        var data = JSON.stringify(
            {
                "method": "menu_control",
                "data": {
                    "show": true
                }
            }
        );
        window.ReactNativeWebView?.postMessage(data)
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
