require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepoila: {
      url: `https://eth-sepolia.g.alchemy.com/v2/WYtvGK3JG9m7Iw2jDJCUtmsNfQOIm24l`,
      accounts: {
        b2f05c37d2d601b192b99614ab326357a01f2b82ce753647186b9d27f35f19b4,
      },
    },
  },
};
