# shopherlook-ios
SHOPHerLOOK iOS application using React Native 


### Installation

    git clone https://github.com/joshjiang/shopherlook-ios.git
    cd shopherlook-ios
    npm install 

Install any other dependencies that the terminal requires that you install. Only required dependencies need to be installed, not optional ones.

### Running
```
npm start
```

Open browser to the port and host indicated for expo server.

Run on iOS simulator or copy QR code in expo app

### Credentials

include an ``environment.js`` file in the root directory that includes all of the required credentials. For instance, in  `` ./environment.js``:
```
export  const  SHOPIFY_ACCESS_TOKEN  = '1234569420666'
```


### Testing
```
npm test
```

runs jest-expo automated snapshot and unit tests 

### Deployment 

Follow this guide to deploy the app to the Apple App Store: 
[https://docs.expo.io/versions/latest/distribution/app-stores/](https://docs.expo.io/versions/latest/distribution/app-stores/)
