const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());
const {
    connectToOrg1CA,
    login,
    updateProfile,
} = require("../crossBorderPayment/application/registerEnrollUser.js");
const {
    loginBank,
    createBankWithExchangeRate,
    fetchBanks,
} = require("../crossBorderPayment/application/Bank.js");
const { createPayment, fetchCustomerPayments } = require("../crossBorderPayment/application/Payment.js");
const {
    createAccount,
    fetchCustomerAccounts,
    fetchBankAccounts,
    deleteAccount,
    searchCustomerbyAccount,
    updateBalance,
} = require("../crossBorderPayment/application/Account.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
    })
);







app.get("/showAccounts", async (req, res) => {
    const customerID = req.session.customerID;
    try {
        const customerAccounts = await fetchCustomerAccounts(customerID);
        req.session.customerID = customerID;
        res.json({ accounts: customerAccounts, customerID: customerID });
    } catch (error) {
        console.error("Error:", error);
        req.session.customerID = customerID;
        res.status(500).json({ error: "Failed to fetch customer accounts." });
    }
});

app.get("/showAccountsforBank", async (req, res) => {
    const bankID = req.session.bankID;
    const bankadminID = req.session.bankadminID;
    try {
        const bankAccounts = await fetchBankAccounts(bankID, bankadminID);
        req.session.bankadminID = bankadminID;
        req.session.bankID = bankID;
        res.json({ accounts: bankAccounts, bankadminID: bankadminID });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch bank accounts." });
    }
});


app.get("/bankHome", (req, res) => {
    const bankID = req.session.bankID;
    const bankadminID = req.session.bankadminID;
    const name = req.session.name;
    const password = req.session.password;
    const country = req.session.country;
    const reserves = req.session.reserves;
    const currency = req.session.currency;

    // Construct a JSON response containing the data
    const responseData = {
        bankID,
        bankadminID,
        name,
        password,
        country,
        reserves,
        currency,
    };

    // Send the JSON response
    res.json(responseData);
});


app.post("/createAccount", async (req, res) => {
    const { customerID, bankID, balance } = req.body;
    try {
        const result = await createAccount(customerID, bankID, balance);
        if (!result.success) {
            const errorMessage = "Your ID is incorrect.";
            res.status(400).json({ errorMessage });
        } else {
            req.session.customerID = customerID;
            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Error:", error);
        req.session.customerID = customerID;
        res.status(500).json({ error: "Failed to create account." });
    }
});


app.post("/createBank", async (req, res) => {
    console.log(req.body);
    const { bankadminID, bankID, name, password, country, currency, reserves } =
        req.body;
    if (!bankadminID || !bankID) {
        return res.status(400).json({ error: "Missing required arguments." });
    }

    try {
        const isSuccess = await createBankWithExchangeRate(
            bankID,
            bankadminID,
            name,
            password,
            country,
            currency,
            reserves
        );
        if (isSuccess) {
            console.log("Banka oluşturma işlemi tamamlandı.");
            req.session.bankID = bankID;
            req.session.bankadminID = bankadminID;
            req.session.name = name;
            req.session.password = password;
            req.session.country = country;
            req.session.reserves = reserves;
            req.session.currency = currency;

            // Return data to the frontend
            res.status(200).json({
                success: true,
                bankID,
                bankadminID,
                name,
                password,
                country,
                reserves,
                currency,
            });
        } else {
            res.status(400).json({ error: "Invalid user." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to create bank." });
    }
});


app.post("/loginBank", async (req, res) => {
    console.log(req.body);
    const { bankadminID, bankID, password } = req.body;
    try {
        const result = await loginBank(bankadminID, bankID, password);
        if (result.success) {
            req.session.bankID = bankID;
            req.session.bankadminID = bankadminID;
            req.session.password = password;
            // Send success response
            res.status(200).json({ success: true });
        } else {
            // Send failure response
            res.status(400).json({ success: false, error: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error:", error);
        // Send error response
        res.status(500).json({ error: "Failed to login bank." });
    }
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { customerID, customerName, customerSurname, customerPassword } = req.body;

    if (!customerID) {
        return res.status(400).json({ error: "Missing required argument: customerID" });
    }

    try {
        const hasNumber = /\d/.test(customerPassword);
        const hasChar = /[a-zA-Z]/.test(customerPassword);

        if (customerPassword.length >= 8 && hasNumber && hasChar) {
            console.log('Inside the if block...')
            const loginResult = await connectToOrg1CA(customerID, customerPassword, customerName, customerSurname);
            console.log('after the if block...', loginResult);

            if (loginResult.success) {
                console.log("signed Up In");
                return res.status(200).json({ success: true });
            } else {
                return res.status(400).json({ error: "same_user" });
            }
        } else {
            return res.status(400).json({ error: "invalid_password" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to register and enroll user." });
    }
});
// Login---------------
app.get("/customerDetails/:customerID", async (req, res) => {
    const customerID = req.params.customerID;
    const bankadminID = req.session.bankadminID;
    const bankID = req.session.bankID;

    try {
        const customerDetails = await searchCustomerbyAccount(customerID);
        req.session.bankadminID = bankadminID;
        req.session.bankID = bankID;
        res.status(200).json({ customer: customerDetails });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch customer details." });
    }
});

app.post("/deleteAccount", async (req, res) => {
    const accountID = req.body.accountID;
    const customerID = req.session.customerID;
    const confirmation = req.body.confirmation;
    try {
        if (confirmation !== "YES") {
            const errorMessage = "You must enter the correct confirmation word to delete the account.";
            res.status(400).json({ error: errorMessage });
            return;
        }
        const result = await deleteAccount(customerID, accountID);
        if (result.success) {
            res.status(200).json({ message: "Your account has been successfully deleted." });
        } else {
            res.status(400).json({ error: "Delete Process failed." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete account." });
    }
});

app.get("/editCustomerProfile", async (req, res) => {
    const customerID = req.session.customerID;
    try {
        const customerDetails = await searchCustomerbyAccount(customerID);
        const customerName = customerDetails.name;
        const customerSurname = customerDetails.surname;
        const customerPassword = customerDetails.password;
        req.session.customerID = customerID;
        res.status(200).json({
            customerID,
            customerName,
            customerSurname,
            customerPassword,
            success: true
        });
    } catch (error) {
        console.error("Error:", error);
        req.session.customerID = customerID;
        res.status(500).json({ error: "Failed to fetch customer details." });
    }
});

app.get("/transferForBank/:accountID", async (req, res) => {
    const bankadminID = req.session.bankadminID;
    const accountID = req.params.accountID;
    const bankID = req.session.bankID;
    try {
        const customerPayments = await fetchCustomerPayments(bankadminID, accountID);
        req.session.bankadminID = bankadminID;
        req.session.bankID = bankID;
        res.json({ payments: customerPayments });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch customer payments." });
    }
});

app.get("/transfer/:accountID", async (req, res) => {
    const customerID = req.session.customerID;
    const accountID = req.params.accountID;
    try {
        const customerPayments = await fetchCustomerPayments(customerID, accountID);
        req.session.customerID = customerID;
        res.json({ payments: customerPayments });
    } catch (error) {
        console.error("Error:", error);
        req.session.customerID = customerID;
        res.status(500).json({ error: "Failed to fetch customer payments." });
    }
});

app.get("/showBank", async (req, res) => {
    const bankID = req.session.bankID;
    const bankadminID = req.session.bankadminID;
    try {
        const bank = await fetchBanks(bankID, bankadminID);
        req.session.bankadminID = bankadminID;
        req.session.bankID = bankID;
        res.json({ bank });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch bank accounts." });
    }
});

app.post("/transfer", async (req, res) => {
    const customerID = req.session.customerID;
    const senderAccountID = req.body.senderAccountID;
    const receiverAccountID = req.body.receiverAccountID;
    const senderCustomerID = req.body.senderCustomerID;
    const receiverCustomerID = req.body.receiverCustomerID;
    const amount = req.body.amount;
    const password = req.body.password;
    const date = new Date().toISOString();

    try {
        const loginResult = await login(senderCustomerID, password);
        if (loginResult.success) {
            const result = await createPayment(
                senderAccountID,
                receiverAccountID,
                senderCustomerID,
                receiverCustomerID,
                amount,
                date
            );
            req.session.customerID = customerID;
            if (result.success) {
                const message = "The transfer made successfully.";
                res.json({ success: true, message });
            } else {
                const errorMessage = "Receiver ID is incorrect.";
                res.status(400).json({ success: false, errorMessage });
            }
        } else {
            const errorMessage = "Your password is incorrect.";
            res.status(400).json({ success: false, errorMessage });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Failed." });
    }
});


app.post("/updateBalance", async (req, res) => {
    const customerID = req.session.customerID;
    const accountID = req.body.accountID;
    const amount = req.body.amount;

    try {
        // Assuming you have a function to update balance in the database
        await updateBalance(customerID, accountID, amount);
        req.session.customerID = customerID;

        const message = "Account balance updated.";
        // Sending response to the frontend
        res.status(200).json({ message });
    } catch (error) {
        console.error("Error:", error);
        req.session.customerID = customerID;
        // Sending error response to the frontend
        res.status(500).json({ error: "Account balance update failed." });
    }
});


app.listen(5000, () => {
    console.log("server started at ", port);
})