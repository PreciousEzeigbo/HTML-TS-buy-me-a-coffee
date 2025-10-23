import { createWalletClient, custom, formatEther, createPublicClient, parseEther, defineChain, PublicClient, WalletClient, Chain } from "viem";
import { contractAddress, coffeeAbi } from "./constants-ts.js";

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any; // MetaMask injects window.ethereum
  }
}

const connectButton = document.getElementById('connectButton') as HTMLButtonElement;
const fundButton = document.getElementById('fundButton') as HTMLButtonElement;
const ethAmountInput = document.getElementById('ethAmount') as HTMLInputElement;
const balanceButton = document.getElementById('balanceButton') as HTMLButtonElement;
const withdrawButton = document.getElementById('withdrawButton') as HTMLButtonElement;

console.log("HIIIIIIII");

let walletClient: WalletClient | undefined;
let publicClient: PublicClient | undefined;

async function connect(): Promise<void> {
  console.log("Attempting to connect...");
  if (typeof window.ethereum !== "undefined") {
    console.log("window.ethereum detected.");
    try {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });
      const accounts: `0x${string}`[] = await walletClient.requestAddresses();
      console.log("Connected accounts:", accounts);
      connectButton.innerHTML = "Connected";
    } catch (error: any) {
      console.error("Error connecting to wallet:", error);
      connectButton.innerHTML = "Connection failed!";
    }
  } else {
    console.log("window.ethereum not detected. Please install MetaMask.");
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function fund(): Promise<void> {
  const ethAmount: string = ethAmountInput.value;
  console.log(`Funding with ${ethAmount}...`);

  if (typeof window.ethereum !== "undefined") {
    try {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });
      const [connectedAccount] = await walletClient.requestAddresses();
      const currentChain: Chain = await getCurrentChain(walletClient);

      console.log("Processing transaction...");
      publicClient = createPublicClient({
        transport: custom(window.ethereum),
      });
      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: coffeeAbi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethAmount),
      });
      const hash = await walletClient.writeContract(request);
      console.log("Transaction processed: ", hash);
    } catch (error: any) {
      console.log(error);
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask!";
  }
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
  const chainId: number = await client.getChainId();
  const currentChain: Chain = defineChain({
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
  });
  return currentChain;
}

async function getBalance(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });
    const balance = await publicClient.getBalance({
      address: contractAddress,
    });
    console.log(`Contract balance: ${formatEther(balance)} ETH`);
  }
}

async function withdraw(): Promise<void> {
  console.log("Withdrawing funds...");

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain: Chain = await getCurrentChain(walletClient);

    console.log("Processing withdrawal transaction...");
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: coffeeAbi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain,
    });
    const hash = await walletClient.writeContract(request);
    console.log("Withdrawal transaction processed: ", hash);
  } else {
    withdrawButton.innerHTML = "Please install MetaMask!";
  }
}

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;