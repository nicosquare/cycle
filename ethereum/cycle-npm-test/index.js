module.exports = function(width, height) {
  return width * height;
};

import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Cycle', {
clientId: '2ojxCynUCy1VWqWJNJSVFAoRRyCPZDkSPw1',
network: 'rinkeby or ropsten or kovan',
signer: SimpleSigner('e42efa79fadf96bfb9e9c4b0f75ea010640f55adcdc3cbdfa13638fe361d923d')
})

// Request credentials to login
uport.requestCredentials({
requested: ['name', 'phone', 'country'],
notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
// Do something
})

// Attest specific credentials
uport.attestCredentials({
sub: THE_RECEIVING_UPORT_ADDRESS,
claim: {
CREDENTIAL_NAME: CREDENTIAL_VALUE
},
exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})
