
const CycleCoinCrowdsale = artifacts.require('./CycleCoinCrowdsale.sol')
const CycleCoin = artifacts.require('./CycleCoin.sol')

const account1 = web3.eth.accounts[1]

var tokenAddress

contract('CycleCoinCrowdsale', (accounts) => {

  it('CycleCoin should deploy', () => {
    return CycleCoinCrowdsale.deployed()
    .then((instance) => {
      assert.notEqual(instance, null, 'Instance should not be null')
    })
  })

  it('should have correct initial values set.', async () => {

    let crowdsale = await CycleCoinCrowdsale.deployed()
    let tokenAddressFromCrowdsale = crowdsale.token()
    return tokenAddressFromCrowdsale
    .then((address) => {
      console.log('\ttoken address', address)
      tokenAddress = address
    })
  })

  it('the account1 must have 0 tokens to his account', async () => {

    let cycleCoinInstance = await CycleCoin.at(tokenAddress)
    return cycleCoinInstance.balanceOf(account1)
    .then((balance) => {
      console.log('\tbalance', balance.toString(10)) 
    })
  })

  it('Buying tokends from address1 with Ether', () => {
    return CycleCoinCrowdsale.deployed()
    .then((instance) => {
      instance.sendTransaction({ from: account1, value: web3.toWei(5, "ether")})
    })
  })

  it('Review again the account1 must have some', async () => {

    let cycleCoinInstance = await CycleCoin.at(tokenAddress)
    return cycleCoinInstance.balanceOf(account1)
    .then((balance) => {
      console.log('\tbalance', balance.toString(10)) 
      console.log('\tbalance without decimals', web3.fromWei(balance, "ether")) 
    })
  })

  

  it('Review again the account1 must have some', async () => {

    let cycleCoinInstance = await CycleCoin.at(tokenAddress)
    return cycleCoinInstance.balanceOf(account1)
    .then((balance) => {
      console.log('\tbalance', balance.toString(10)) 
      console.log('\tbalance without decimals', web3.fromWei(balance, "ether")) 
    })
  })
    
})  