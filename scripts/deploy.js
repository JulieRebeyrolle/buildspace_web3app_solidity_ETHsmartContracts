const main = async () => {
    const musicContractFactory = await hre.ethers.getContractFactory('MusicPortal');
    const musicContract = await musicContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await musicContract.deployed();

    console.log('MusicPortal address : ', musicContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();