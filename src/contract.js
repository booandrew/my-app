import { Contract, ethers } from "ethers";

export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "Citizen",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "someNote",
        type: "string",
      },
    ],
    name: "addCitizen",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getNoteByCitizenId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export let provider;

if (window.ethereum == null) {
  console.log("MetaMask not installed; using read-only defaults");
  provider = ethers.getDefaultProvider();
} else {
  provider = new ethers.BrowserProvider(window.ethereum);
}

export const CitizenContract = new Contract(
  "0xa011799d9467d2b33768fb1a3512f1b468b87e96",
  abi,
  provider
);
