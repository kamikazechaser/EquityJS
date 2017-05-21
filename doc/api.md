## Equity
Equity

**Kind**: global class

* [Equity](#Equity)
    * [new Equity(consumerKey, consumerSecret, sandbox)](#new_Equity_new)
    * [.getToken(username, password)](#Equity+getToken) ⇒ <code>Promise</code>
    * [.changePassword(token, id, currentPassword, newPassword)](#Equity+changePassword) ⇒ <code>Promise</code>
    * [.paymentStatus(token, id)](#Equity+paymentStatus) ⇒ <code>Promise</code>
    * [.purchaseAirtime(token, mobileNumber, amount, reference, telco)](#Equity+purchaseAirtime) ⇒ <code>Promise</code>
    * [.onlineRemit(token, transactionReference, senderName, accountNumber, bicCode, mobileNumber, walletName, bankCode, branchCode, countryCode, currencyCode, amount, paymentType, paymentReferences, remarks)](#Equity+onlineRemit) ⇒ <code>Promise</code>
    * [.createPayment(token, mobileNumber, amount, description, type, auditNumber)](#Equity+createPayment) ⇒ <code>Promise</code>

<a name="new_Equity_new"></a>

### new Equity(consumerKey, consumerSecret, sandbox)

| Param | Type | Description |
| --- | --- | --- |
| consumerKey | <code>String</code> | (Required) Consumer key from Equity Bank. |
| consumerSecret | <code>String</code> | (Required) Consumer secret from Equity Bank. |
| sandbox | <code>Boolean</code> | (Optional) Enables sandbox API. Deafults to false. |

<a name="Equity+getToken"></a>

### equity.getToken(username, password) ⇒ <code>Promise</code>
Generate an access token.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | Merchant username, provided by Equity Bank. |
| password | <code>String</code> | Merchant password, provided by Equity Bank. |

<a name="Equity+changePassword"></a>

### equity.changePassword(token, id, currentPassword, newPassword) ⇒ <code>Promise</code>
Change merchant password.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token. |
| id | <code>Number</code> | Merchant ID. provided by Equity Bank. |
| currentPassword | <code>String</code> | Merchant Username, provided by Equity Bank. |
| newPassword | <code>String</code> | Merchant Password, provided by Equity. |

<a name="Equity+paymentStatus"></a>

### equity.paymentStatus(token, id) ⇒ <code>Promise</code>
Get payment status.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token. |
| id | <code>Number</code> | Transaction ID. |

<a name="Equity+purchaseAirtime"></a>

### equity.purchaseAirtime(token, mobileNumber, amount, reference, telco) ⇒ <code>Promise</code>
Purchase airtime.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token. |
| mobileNumber | <code>String</code> | Mobile Number For Which To Purchase Airtime. |
| amount | <code>Number</code> | Airtime amount. |
| reference | <code>String</code> | Airtime reference. |
| telco | <code>String</code> | Network operator. |

<a name="Equity+onlineRemit"></a>

### equity.onlineRemit(token, transactionReference, senderName, accountNumber, bicCode, mobileNumber, walletName, bankCode, branchCode, countryCode, currencyCode, amount, paymentType, paymentReferences, remarks) ⇒ <code>Promise</code>
Online remittance.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token. |
| transactionReference | <code>String</code> | Transaction reference. |
| senderName | <code>String</code> | Sender's name. |
| accountNumber | <code>String</code> | Account number. |
| bicCode | <code>String</code> | BIC code. |
| mobileNumber | <code>String</code> | Mobile number. |
| walletName | <code>String</code> | Wallet name. |
| bankCode | <code>String</code> | Bank code. |
| branchCode | <code>String</code> | Branch code. |
| countryCode | <code>String</code> | Country code. |
| currencyCode | <code>String</code> | Currency code. |
| amount | <code>Number</code> | Amount. |
| paymentType | <code>String</code> | Payment type. |
| paymentReferences | <code>Array</code> | 3 Payment references. |
| remarks | <code>String</code> | Additional remarks. |

<a name="Equity+createPayment"></a>

### equity.createPayment(token, mobileNumber, amount, description, type, auditNumber) ⇒ <code>Promise</code>
Create payment.

**Kind**: instance method of <code>[Equity](#Equity)</code>
**Returns**: <code>Promise</code> - Response.

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | Access token. |
| mobileNumber | <code>String</code> | Mobile number. |
| amount | <code>Number</code> | Amount. |
| description | <code>String</code> | Payment description. |
| type | <code>String</code> | Payment type. |
| auditNumber | <code>String</code> | Audit number. |

Released Under AGPL-3.0@forfuture.tech>
