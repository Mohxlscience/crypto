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
    "tether-usd-eth": "img/usdt_eth.png", // USDT sur Ethereum (ERC20)
    "tether-usd-tron": "img/usdt_tron.png", // USDT sur Tron (TRC20)
    "tether-usd-bsc": "img/usdt_bsc.png" // USDT sur Binance Smart Chain (BEP20)
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

    // Pour USDT, utiliser le protocole spécifique en fonction du réseau sélectionné
    if (crypto === "tether-usd") {
        if (network === "tether-usd-eth") {
            selectedCrypto = "ethereum";  // Remplacer par "ethereum" pour ERC20
            cryptoSymbol = "USDT";
            cryptoName = "Tether USD";
            logoSrc = cryptoLogos["tether-usd-eth"];
        } else if (network === "tether-usd-tron") {
            selectedCrypto = "tron";  // Remplacer par "tron" pour TRC20
            cryptoSymbol = "USDT";
            cryptoName = "Tether USD";
            logoSrc = cryptoLogos["tether-usd-tron"];
        } else if (network === "tether-usd-bsc") {
            selectedCrypto = "bsc";  // Remplacer par "bsc" pour BEP20
            cryptoSymbol = "USDT";
            cryptoName = "Tether USD";
            logoSrc = cryptoLogos["tether-usd-bsc"];
        }
    } else {
        // Définir les valeurs pour les autres cryptos
        cryptoSymbol = {
            bitcoin: "BTC",
            ethereum: "ETH",
            litecoin: "LTC",
            ripple: "XRP",
            tron: "TRX",
            "bitcoin-cash": "BCH",
            cardano: "ADA",
            dogecoin: "DOGE",
            polkadot: "DOT",
            stellar: "XLM",
            solana: "SOL"
        }[crypto];
        
        cryptoName = {
            bitcoin: "Bitcoin",
            ethereum: "Ethereum",
            litecoin: "Litecoin",
            ripple: "Ripple",
            tron: "Tron",
            "bitcoin-cash": "Bitcoin Cash",
            cardano: "Cardano",
            dogecoin: "Dogecoin",
            polkadot: "Polkadot",
            stellar: "Stellar",
            solana: "Solana"
        }[crypto];

        logoSrc = cryptoLogos[crypto];
    }

    const uri = `${selectedCrypto}:${address}?amount=${amount}`;
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    QRCode.toCanvas(
        document.createElement("canvas"),
        uri,
        { width: 256, height: 256 },
        function (error, canvas) {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);
            document.getElementById("qrcode-container").style.display = "block";
            document.getElementById("crypto-logo").src = logoSrc;
            document.getElementById("crypto-symbol").innerText = cryptoSymbol;
            document.getElementById("crypto-address").innerText = address;
            document.querySelector("p span").innerText = cryptoSymbol;

            document.getElementById("crypto-receive").innerText = `Receive ${cryptoName} (${cryptoSymbol})`;
        }
    );
}

function copyAddress() {
    const address = document.getElementById("address").value;
    navigator.clipboard
        .writeText(address)
        .then(() => {
            alert("Adresse copiée dans le presse-papiers !");
        })
        .catch((err) => {
            console.error("Échec de la copie : ", err);
        });
}

function downloadQRCode() {
    const qrCodeCanvas = document.querySelector("#qrcode canvas");
    const qrCodeDataUrl = qrCodeCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = "qrcode.png";
    link.click();
}
