import './style.css';

function SenDataToApp() {
    async function openScanQR() {
        window.ReactNativeWebView?.postMessage(
            JSON.stringify(
                {
                    "method": "scan_qr"
                }
            )
        )
    }

    return (
        <div className="container">
            <h1>Send Data to app</h1>
            <div>
                <button onClick={openScanQR}>
                    Open Scan QR
                </button>
            </div>
        </div>
    )
}

export default SenDataToApp
