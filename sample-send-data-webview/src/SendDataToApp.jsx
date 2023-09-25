import './style.css';

function SenDataToApp() {
    async function openScanQR() {
        var data = JSON.stringify(
            {
                "method": "scan_qr"
            }
        );
        window.ReactNativeWebView?.postMessage(data)
    }

    async function hideMenu() {
        var data = JSON.stringify(
            {
                "method": "menu_control",
                "data": false

            }
        );
        window.ReactNativeWebView?.postMessage(data)
    }

    async function showMenu() {
        var data = JSON.stringify(
            {
                "method": "menu_control",
                "data": true
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
            <h1>Send Data to app</h1>
            <div>
                <button onClick={openScanQR}>
                    Open Scan QR
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
            <br/>

            <div>
                <a href={'https://www.youtube.com/shorts/IqPLC7dMijY'}>
                    Open youtube
                </a>
                <a href={'https://metamask.app.link/dapp/wallet.dosi.world'}>
                    https://metamask.app.link/dapp/wallet.dosi.world
                </a>
            </div>
        </div>
    )
}

export default SenDataToApp
