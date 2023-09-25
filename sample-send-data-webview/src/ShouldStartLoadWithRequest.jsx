import './style.css';
import {useState} from "react";

function ShouldStartLoadWithRequest() {
    const [url, setUrl] = useState('')
    return (
        <div className="container" style={
            {
                minHeight: 400
            }
        }>
            <h1>on Should Start Load With Request</h1>

            <div>
                <a href={'https://www.youtube.com/shorts/IqPLC7dMijY'}>
                    Open youtube
                </a>
                <br/>
                <br/>
                <br/>
                <a href={'https://metamask.app.link/dapp/wallet.dosi.world'}>
                    https://metamask.app.link/dapp/wallet.dosi.world
                </a>
            </div>

            <h1>Custom</h1>
            <div>
                Url: <input onChange={e => setUrl(e.target.value)}/>
                <br/>
                <br/>
                <a href={url}>Open url: {url}</a>
            </div>
        </div>
    )
}

export default ShouldStartLoadWithRequest
