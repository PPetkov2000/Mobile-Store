## Table of Contents

* [Installation](#installation)
* [General Requirements](#general-requirements)
* [Website](#website)

## Installation

1. Clone the repo
```sh
git clone https://github.com/PPetkov2000/Mobile-Store
```
2. Install NPM backend packages
```sh
npm install
```
3. Install NPM frontend packages
```sh
cd frontend => npm install
```
4. Create .env file and add this in the root folder
```sh
PORT=6000
MONGO_URI=your_mongoDB_uri
JWT_SECRET=your_jwt_secret

<h2>For the PayPal button to work add this</h2>
PAYPAL_CLIENT_ID=your_paypal_client_id
```
5. Run Application
```sh
run frontend => npm run client
run backend => npm run server
run both => npm run dev
```
6. Go to
```sh
http://localhost:3000/
```

## General Requirements

- React.js for client-side
- Node.js
- Express framework 
- MongoDB Atlas for database

## Website

![Game Zone](https://github.com/PPetkov2000/Mobile-Store/blob/main/app-view2.PNG)
