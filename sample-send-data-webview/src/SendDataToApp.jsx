import './style.css';
import {useCallback, useState} from "react";

function SenDataToApp() {
    window.addEventListener("message", message => {
        // const data = JSON.parse(message.data)
        // alert("Method: " + data.method + ", data: " + data.data)
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
        } catch (e) {
            alert(e.message)
        }
    }

    async function logout() {
        try {
            await dosiVault.webviewAction("logout", {}
            );
        } catch (e) {
            alert(e.message)
        }
    }

    async function unlock() {
        try {
            console.log("Start unlock")
            const result = await dosiVault.webviewAction("unlock", {}
            );
            console.log("Unlock Status: " + result)
        } catch (e) {
            console.log("Error unlock")
        }
    }

    const [biometricsTestService, setBiometricsTestService] = useState('service_1')
    const [biometricsTestPassword, setBiometricsTestPassword] = useState('password_1')

    const biometricsTest = useCallback(async (method) => {
        try {
            if (method === "create") {
                console.log(biometricsTestPassword)
                await dosiVault.webviewAction("BiometricsMessageTestData", {
                        method: "create",
                        service: biometricsTestService,
                        password: biometricsTestPassword
                    }
                );
            }
            if (method === "verify") {
                console.log(biometricsTestPassword)
                await dosiVault.webviewAction("BiometricsMessageTestData", {
                        method: "verify",
                        service: biometricsTestService,
                    }
                );
            }
        } catch (e) {
            console.log("Error unlock")
        }
    }, [biometricsTestService, biometricsTestPassword]);

    return (
        <div className="container" style={
            {
                minHeight: 400
            }
        }>
            <div>
                <h5>Open app from depplink</h5>
                <a href={'app.dosivault://dapp?uri_dapps=https://sample-send-data-webview-lv00212.website.line-apps-dev.com&efr=1'}>
                    Open this page on dosi vault
                </a>
                <br/>
                <a href={'app.dosivault://dapp?uri_dapps= http://localhost:5173&efr=1'}>
                    Open this page on dosi vault local
                </a>
            </div>
            <div>
                <h5>Common navigate</h5>

                <button onClick={() => openNavigate('qrScan')}>
                    Open Scan QR
                </button>
                <button onClick={() => openNavigate('send')}>
                    Open Send
                </button>
            </div>
            <div>
                <h5>Flow login logout</h5>
                <button onClick={() => openNavigate('doLogin')}>
                    Do Login
                </button>
                <button onClick={() => openNavigate('creatFNSAeWallet')}>
                    Do Set password
                </button>
                <button onClick={() => openNavigate('ShareDMnemonicReveal')}>
                    ShareD
                </button>
                <button onClick={() => openIAB('https://www.google.com/')}>
                    Open IAB
                </button>
                <button onClick={() => logout()}>
                    Logout
                </button>
            </div>
            <div>
                <h5>Main navigate</h5>
                <button onClick={() => openNavigate('home')}>
                    MENU HOME
                </button>
                <button onClick={() => openNavigate('barnd')}>
                    MENU BARND
                </button>
                <button onClick={() => openNavigate('market')}>
                    MENU MARKET
                </button>
                <button onClick={() => openNavigate('notice')}>
                    MENU NOTICE
                </button>
                <button onClick={() => openNavigate('profile')}>
                    MENU PROFILE
                </button>
            </div>
            <div>
                <h5>KeyRing</h5>

                <button onClick={() => unlock()}>
                    Unlock
                </button>
            </div>
            <div>
                <h5>Biometrics test</h5>
                Service: <input defaultValue={biometricsTestService}
                                onChange={e => setBiometricsTestService(e.target.value)}/>
                <br/>
                password: <input defaultValue={biometricsTestPassword}
                                 onChange={e => setBiometricsTestPassword(e.target.value)}/>
                <br/>

                <button onClick={() => biometricsTest("create")}>
                    Create
                </button>

                <button onClick={() => biometricsTest("verify")}>
                    verify
                </button>
            </div>
            <br/>
            <div>
                <h5>Menu Control</h5>
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
