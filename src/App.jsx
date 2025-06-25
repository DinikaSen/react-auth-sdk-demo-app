import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import './App.css';

const App = () => {
const { state, signIn, signOut, getBasicUserInfo, httpRequest } = useAuthContext();
const [ userInfo, setUserInfo ] = useState(undefined);
const [ transactions, setTransactions ] = useState([]);
const [ loading, setLoading ] = useState(false);
const [ error, setError ] = useState(null);

useEffect(() => {
  getBasicUserInfo().then((response) => {
    setUserInfo(response)
    console.log(response);
  }).catch((error) => {
    console.error(error);
  });
}, [state]);

const fetchTransactions = async () => {
  try {
    const requestConfig = {
      headers: {
        "Accept": "application/json"
      },
      method: "GET",
      url: "https://freecodecampdemo.free.beeceptor.com/transactions",
    };

    const response = await httpRequest(requestConfig);
    console.log(response);
    setTransactions(response.transactions || []);
  } catch (error) {
    console.log(error);
    setError("Failed to load transactions");
    setTransactions([]);
  } finally {
    setLoading(false);
  }
};

return (
    <>
    {
        state.isAuthenticated
        ? 
        <>
          <h2> Hello { state.username }! </h2> 
          <h3> Your Profile</h3>
          <p>Username : { userInfo?.username } </p>
          <p>First Name : { userInfo?.givenName } </p>
          <p>Last Name : { userInfo?.familyName } </p>
          
          <h3 style={{ marginTop: '40px' }}>Your Transactions</h3>

          <button onClick={fetchTransactions} disabled={loading} style={{ marginBottom: '20px' }}>
            {loading ? 'Loading...' : 'View Transactions'}
          </button>

          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          <ul>
            {transactions.map(txn => (
              <li key={txn.id}>
                {txn.date} - {txn.description}: ${txn.amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <button onClick={() => signOut()}>Logout</button>
        </>
        : <button onClick={() => signIn()}>Login</button>
    }
    </>
)
};

export default App;