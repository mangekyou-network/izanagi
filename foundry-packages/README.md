
### Contracts on MORPH  


Izanagi contract is deployed on Morph L2 Testnet and is verified : 
https://explorer-testnet.morphl2.io/address/0x532802f2F9E0e3EE9d5Ba70C35E1F43C0498772D?tab=contract


To deploy run : 

```
forge script script/Izanagi.s.sol:IzanagiScript --rpc-url 'https://rpc-testnet.morphl2.io' --gas-limit 20000000 --gas-price 12000000000 --legacy --broadcast
``` 

To verify run : 

```
forge verify-contract 0x532802f2F9E0e3EE9d5Ba70C35E1F43C0498772D Izanagi --verifier-url https://explorer-api-testnet.morphl2.io/api --chain-id 2710 --etherscan-api-key STQXXFDG565J54MYRQ4P1YYCY558TRA1P9 
``` 



