const cryptoLogos = {
    bitcoin: "img/bitcoin.png",
    ethereum: "img/etherium.png",
    litecoin: "img/litecoin.png",
    ripple: "img/ripple.png",
    tron: "img/tron.png",
    "bitcoin-cash": "img/bitcoin_cash.png",
    cardano: "img/cardano.png",
    dogecoin: "img/dogecoin.png",
    polkadot: "img/polkadot.png",
    stellar: "img/stellar.png",
    solana: "img/solana.png",
    "tether-usd-eth": "img/usdt_eth.png",
    "tether-usd-tron": "img/usdt_tron.png",
    "tether-usd-bsc": "img/usdt_bsc.png",
    "tether-usd-matic": "img/usdt_matic.png" // USDT sur Polygon (MATIC)
};

function toggleNetworkOption() {
    const cryptoSelect = document.getElementById("crypto").value;
    const networkGroup = document.getElementById("network-group");

    if (cryptoSelect === "tether-usd") {
        networkGroup.style.display = "block";
    } else {
        networkGroup.style.display = "none";
    }
}

function generateQRCode() {
    const crypto = document.getElementById("crypto").value;
    const address = document.getElementById("address").value;
    const amount = document.getElementById("amount").value;
    const network = document.getElementById("network").value;

    let selectedCrypto = crypto;
    let cryptoSymbol = "";
    let cryptoName = "";
    let logoSrc = "";

    if (crypto === "tether-usd") {
        switch (network) {
            case "tether-usd-eth":
                selectedCrypto = "ethereum";
                cryptoSymbol = "USDT";
                cryptoName = "Tether USD (ERC20)";
                logoSrc = cryptoLogos["tether-usd-eth"];
                break;
            case "tether-usd-tron":
                selectedCrypto = "tron";
                cryptoSymbol = "USDT";
                cryptoName = "Tether USD (TRC20)";
                logoSrc = cryptoLogos["tether-usd-tron"];
                break;
            case "tether-usd-bsc":
                selectedCrypto = "bsc";
                cryptoSymbol = "USDT";
                cryptoName = "Tether USD (BEP20)";
                logoSrc = cryptoLogos["tether-usd-bsc"];
                break;
            case "tether-usd-matic":
                selectedCrypto = "matic";
                cryptoSymbol = "USDT";
                cryptoName = "Tether USD (MATIC)";
                logoSrc = cryptoLogos["tether-usd-matic"];
                break;
        }
    } else {
        cryptoSymbol = /* valeurs existantes */;
        cryptoName = /* valeurs existantes */;
        logoSrc = cryptoLogos[crypto];
    }

    const uri = `${selectedCrypto}:${address}?amount=${amount}`;
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    QRCode.toCanvas(uri, { width: 256 }, (err, canvas) => {
        if (!err) qrCodeContainer.appendChild(canvas);
        document.getElementById("qrcode-container").style.display = "block";
        document.getElementById("crypto-logo").src = logoSrc;
    });
}