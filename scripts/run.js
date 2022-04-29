const main = async () => {
    const [owner, randomPerson] =  await hre.ethers.getSigners();
    const musicContractFactory = await hre.ethers.getContractFactory('MusicPortal');
    const musicContract = await musicContractFactory.deploy();
    await musicContract.deployed();

    console.log('Contract deployed to:', musicContract.address);
    console.log('Contract deployed by:', owner.address);

    let songCount;
    songCount = await musicContract.getTotalSongs();

    let waveTxn = await musicContract.shareSong();
    await waveTxn.wait();

    songCount = await musicContract.getTotalSongs();

    waveTxn = await musicContract.connect(randomPerson).shareSong();
    await waveTxn.wait();

    songCount = await musicContract.getTotalSongs();
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