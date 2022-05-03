const main = async () => {
    const musicContractFactory = await hre.ethers.getContractFactory('MusicPortal');
    const musicContract = await musicContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await musicContract.deployed();
    console.log("MusicContract address:", musicContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        musicContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    /*
     * Send song
     */
    let songTxn = await musicContract.shareSong("https://open.spotify.com/track/5upkLQtfQm3ODXH2DSS6mk?si=84593d6bc03a44c9");
    await songTxn.wait(); // Wait for the transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    const waveTxn = await musicContract.shareSong("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await musicContract.shareSong("This is wave #2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allSongs = await musicContract.getAllSongs();
    console.log(allSongs);
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