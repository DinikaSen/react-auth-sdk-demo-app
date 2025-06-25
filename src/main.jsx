import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from '@asgardeo/auth-react';
import './index.css';

const config = {
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "du3XfnVmkwrDVtxdhHstpB0Y_iYa",
    baseUrl: "https://api.asgardeo.io/t/ciamdemo001",
    scope: [ "openid", "profile" ],
    storage: "webWorker",
    resourceServerURLs: ["https://freecodecampdemo.free.beeceptor.com"]
}

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <AuthProvider config={ config }>
        <App />
    </AuthProvider>
</React.StrictMode>,
);