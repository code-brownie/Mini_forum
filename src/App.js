import { Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./page/Home";
import BankAccountsPage from "./page/BankAccountList";
import BankHomePage from "./page/BankHome";
import CreateAccountForm from "./page/CreateAccount";
import BankPage from "./page/CreateBank";
import CustomerPage from "./page/CreateCustomer";
import CustomerDetails from "./page/CustomerDetails";
import DeleteAccountComponent from "./page/DeleteAccount";
import AccountActivities from "./page/Payment";
import PaymentListForBank from "./page/PaymentListForBanks";
import BankInfo from "./page/ShowBanks";
import TransferForm from "./page/Transfer";
import UpdateBalanceForm from "./page/UpdateBalance";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/banksList" element={<BankAccountsPage />} />
      <Route path="/bankHome" element={<BankHomePage />} />
      <Route path="/createAccount" element={<CreateAccountForm />} />
      <Route path="/createBank" element={<BankPage />} />
      <Route path="/signup" element={<CustomerPage />} />
      <Route path="/customerDetails" element={<CustomerDetails />} />
      <Route path="/deleteAccount" element={<DeleteAccountComponent />} />
      <Route path="/paymentCustomer" element={<AccountActivities />} />
      <Route path="/paymentBanks" element={<PaymentListForBank />} />
      <Route path="/showBanks" element={<BankInfo />} />
      <Route path="/transferMoney" element={<TransferForm />} />
      <Route path="/updateBalance" element={<UpdateBalanceForm />} />

    </Routes>
  );
}

export default App;
