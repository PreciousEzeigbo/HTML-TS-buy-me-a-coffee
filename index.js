import { createWalletClient, custom, formatEther, createPublicClient, parseEther, defineChain } from "https://esm.sh/viem@2.8.0?bundle&target=es2020";
import { contractAddress, coffeeAbi } from "./constants-js.js";

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const ethAmountInput = document.getElementById('ethAmount');
const balanceButton = document.getElementById('balanceButton');
const withdrawButton = document.getElementById('withdrawButton');

let walletClient;
let publicClient;

async function connect() {
  console.log("Attempting to connect...");
  if (typeof window.ethereum !== "undefined") {
    console.log("window.ethereum detected.");
    try {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      })
      const accounts = await walletClient.requestAddresses();
      console.log("Connected accounts:", accounts);
      connectButton.innerHTML = "Connected"
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      connectButton.innerHTML = "Connection failed!"
    }
  } else {
    console.log("window.ethereum not detected. Please install MetaMask.");
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount}...`)

  if (typeof window.ethereum !== "undefined") {
    try {
        walletClient = createWalletClient({
        transport: custom(window.ethereum),
    })
    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    console.log("Processing transaction...")
    publicClient = createPublicClient({
        transport: custom(window.ethereum),
    })
    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: coffeeAbi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethAmount),
    })
    const hash = await walletClient.writeContract(request)
    console.log("Transaction processed: ", hash)
    } catch (error) {
      console.log(error)
    }
    } else {
        fundButton.innerHTML = "Please install MetaMask!"
  }
}

async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
        },
        rpcUrls: {
        default: {
            http: ["http://localhost:8000"],
        },
        },
    })
    return currentChain
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        })
        const balance = await publicClient.getBalance({
            address: contractAddress,
        })
        console.log(`Contract balance: ${formatEther(balance)} ETH`)
    }
}

async function withdraw() {
    console.log("Withdrawing funds...")

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        })
        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        console.log("Processing withdrawal transaction...")
        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        })
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
        })
        const hash = await walletClient.writeContract(request)
        console.log("Withdrawal transaction processed: ", hash)
    } else {
        withdrawButton.innerHTML = "Please install MetaMask!"
    }
}

connectButton.onclick = connect;
fundButton.onclick = fund;                                                                                                                                                                                                                                                                                                                                                                                      
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;