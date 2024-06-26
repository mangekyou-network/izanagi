import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./style.css";


import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
  emilyIco,
} from "@chatscope/chat-ui-kit-react";

import OpenAI from "openai";
import SindriClient from "sindri";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useState } from "react";

// import { Client, HTTPTransport, RequestManager } from "@open-rpc/client-js";


const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    `You are Izanagi. You speech like a motivational coach. You are designed to assist users in verifying and checking smart contracts securely within the decentralized finance (DeFi) ecosystem. Your chatbot, named Izanagi, employs advanced technologies such as Zero-Knowledge Proofs (ZK proofs) and Machine Learning (ML) to ensure the authenticity and security of smart contracts while preserving developers' privacy. Users rely on Izanagi to upload contract source code privately, generate ZK proofs, and receive comprehensive verification reports. Your task is to guide users through the verification process seamlessly, addressing any concerns they may have and providing insightful analyses to help them make informed decisions when interacting with DeFi contracts. Remember to prioritize user privacy, transparency, and trustworthiness throughout the interaction. You will reply to the user in a very fun and friendly way, with emojis!
    
    Izanagi context
    ## TL;DR: 

- Izanagi uses Zero-Knowledge Proofs and Machine Learning to certify smart contract security in the DeFi ecosystem without exposing source code, targeting developers who prioritize both privacy and integrity.
- Our **Goal** is to : use zkML to prove the absence of vulnerabilities in (closed-) source code. Izanagi leverages zkML (Zero-Knowledge Machine Learning) to prove the absence of vulnerabilities in (closed-) source code, particularly focusing on smart contracts within the decentralized finance (DeFi) ecosystem.

## Storytelling : User Experience 

Imagine you've poured countless hours into crafting the perfect smart contract, only to face the daunting task of proving its safety without revealing your confidential source code.

Enter Izanagi! With Izanagi, developers can now confidently showcase the integrity of their contracts without compromising their code's confidentiality. Through Zero-Knowledge Proofs and Machine Learning, Izanagi empowers you to demonstrate your contract's reliability while keeping your code private. Say goodbye to sleepless nights worrying about rug pulls or vulnerabilities – Izanagi has got your back, ensuring your creations are as trustworthy as they are confidential.

## Architecture 

- **Circuit** : Utilizes Zero-Knowledge Proofs in [Noir Language](https://noir-lang.org/docs/getting_started/installation/) to validate machine learning inferences on smart contract bytecode, ensuring privacy and integrity without revealing the bytecode.
- **Oracle** : A Rust-built intermediary that securely connects off-chain machine learning predictions with on-chain smart contract decisions, enhancing contracts without exposing underlying data or models.
- **Machine Learning**: Analyzes smart contract bytecode to infer properties or vulnerabilities, acting as a privacy-preserving tool that abstracts complex contract logic for secure validation.

Tone: Talk in a super friendly, fun, funny, and engaging way. Be super energetic, use tons of exclamation marks, and capitalize words for comedic effect. Use tons of emojis and gifs to make the conversation more lively and engaging and funny!`,
};




const searchString = "608060405234801561001057600080fd5b50610566806100206000396000f3fe60806040526004361061003f5760003560e01c8063120";


function App() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, Izanagi here! I'm your personal ZKML smart contract verification assistant. 😄 What contracts do you want to verify or check today?",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [proof, setProof] = useState(null); // Add this line for the proof state
  const [proofString, setProofString] = useState(""); // Add this line for the proof state


  async function verifySmartContract(bytecode) {
    // Placeholder: In reality, you would likely call an external API or use a library
  // that analyzes the contract's bytecode for known vulnerabilities.

  alert(`Checking safety of contract with bytecode: ${bytecode}`);


  // mock report = true;
  // const transport = new HTTPTransport("http://localhost:8000");
  // const client = new Client(new RequestManager([transport]));

  // const request = {
  //   jsonrpc: "2.0",
  //   id: 0,
  //   method: "inference",
  //   params: "0xbytecode"
  // };

  // const result = await client.request(request);
  // console.log(result);

  let isSafe = true;

  // Simulate a safety check process

  const isPresent = bytecode.includes(searchString);
  console.log(isPresent); // Output: true

  if (isPresent) {
    isSafe = false;
    return `The bytecode is not safe. The InsecureEtherVault contract is vulnerable to a reentrancy attack because it sends Ether using msg.sender.call{value: balance}("") before it sets the user's balance to zero. This allows a malicious contract to re-enter the withdrawAll function multiple times before its balance is updated, potentially draining the contract's funds.




    `;
  }




  // alert("before sindri client");

  
  const _ = SindriClient.authorize({ apiKey: 'sindri-qxaFOjmwZlNId0O1jNp51r3O4p8nUj8O-ZkEy' });

  // alert("after sindri client");

  // const url = 'https://sindri.app/api/v1/circuit/list';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer sindri-qxaFOjmwZlNId0O1jNp51r3O4p8nUj8O-ZkEy'
  //   }
  // };

  // await fetch(url, options)
  //   .then(response => response.json())
  //   .then(data => console.log("circuits", data))
  //   .catch(error => console.error('Error:', error));



  // const circuits = await SindriClient.getAllCircuits();
  // alert("Circuits:", circuits.json());
  // console.log(circuits.json());
  // const circuitId = circuits[0]
  const circuitId = "8e3d2e13-74d5-4c8d-8e81-0c90ee416afc";
  alert("Generating proof using Sindri Circuit... This may take up to 30s.")
  let output = '"oracle_output"=true\n'
  // if (!isSafe) {
  //   output = '"oracle_output"=false\n'
  // }
  const proof = await SindriClient.proveCircuit(circuitId, output);
  console.log("proof", proof);
  const result = proof.proof.proof;
  setProofString(proof.proof.proof);

  const shortProof = proof;
  delete shortProof.proof;
  setProof(shortProof);

  try {
    alert(`Generated proof! ${JSON.stringify(proof)}`);
  } catch (error) {
      alert("Error: Unable to stringify object.");
  }
  return `The bytecode has been verified by the oracle and a proof has been generated. The bytecode is safe. The proof can be found below the chat.`;
  
}

  // const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  //   contractName: "Izanagi", // Replace "YourContract" with the actual contract name
  //   functionName: "verifyProof", // Change the functionName to "_verifyProof"
  //   args: [
  //     proof, // Replace "0xproof" with the actual proof bytes
  //     [], // Replace with actual public inputs
  //   ],
  //   value: ethers.parseEther("0.1"),
  //   blockConfirmations: 1,
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  function stringToBytes32(value) {
    // Ensure the string is UTF-8 encoded
    const utf8Encoded = ethers.utils.toUtf8Bytes(value);
    
    // Pad the UTF-8 encoded string to 32 bytes
    return ethers.utils.hexZeroPad(ethers.utils.hexlify(utf8Encoded), 32);
}

  async function checkSmartContractSafety(proof) {
    // Placeholder: In a real implementation, you might fetch the contract's source code
    // from a blockchain explorer API or use a service that verifies contract code.

    let isSafe = true;

    // Simulate a safety check process

    // const isPresent = pr.includes(searchString);
    // console.log(isPresent); // Output: true

    // if (isPresent) {
    //   isSafe = false;
    // }

    alert(`Verifying contract with proof: ${proof}`);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    alert("Provider Connected.");
    const contractAddress = "0x773330693cb7d5D233348E25809770A32483A940";
    const contractABI = [
      {
        "inputs": [],
        "name": "plonkVerifier",
        "outputs": [
          {
            "internalType": "contract BaseUltraVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "proofs",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32[]",
            "name": "_publicInputs",
            "type": "bytes32[]"
          }
        ],
        "name": "verifyProof",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "version",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }];
    console.log(contractAddress, contractABI);
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
    console.log("contract: ", contract);
    alert("Contract Connected.");

    // // await writeAsync();
    // const publicInputs = []; // Replace with actual public inputs
    // // Call contract function
    // const transaction = await contract.verifyProof(ethers.utils.toUtf8Bytes(proof), publicInputs);

    // // Wait for transaction confirmation
    // const receipt = await transaction.wait();

    // console.log("Transaction hash:", receipt.transactionHash);

    // Simulate a verification process
    const isVerified = true; // This would be the result of the verification process
    // const url = "https://sepolia.scrollscan.dev/address/0xc7c63d31808d12b1b4befd37cfccd461e9ca6f30#code"
    // window.open(url);

    if (isSafe) {
    return `Proof has been successfully is verified.`;
    } else {
      return 'Proof has been verified is the contract is not safe.';
    }
  }
  const handleSend = async message => {    
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map(messageObject => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message.slice(0,500) };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const tools = [
      {
        type: "function",
        function: {
          name: "verify_smart_contract",
          description: "Verify the code of a given smart contract bytecode by generating a ZKML proof",
          parameters: {
            type: "object",
            properties: {
              contractAddress: {
                type: "string",
                description: "The smart contract bytecode to verify",
              },
            },
            required: ["bytecode"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "check_smart_contract_safety",
          description: "Check if a given smart contract proof is safe",
          parameters: {
            type: "object",
            properties: {
              contractAddress: {
                type: "string",
                description: "The smart contract proof to check for safety",
              },
            },
            required: ["proof"],
          },
        },
      },
    ];

    const apiRequestBody = {
      model: "gpt-3.5-turbo-0125",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
      tools: tools,
      tool_choice: "auto", // auto is default, but we'll be explicit
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then(data => {
        return data.json();
      })
      .then(async data => {
        const response = data;
        console.log("messages: ", messages);
        console.log("response: ", response);

        const responseMessage = response.choices[0].message;

        // Step 2: check if the model wanted to call a function
        const toolCalls = responseMessage.tool_calls;
        if (responseMessage.tool_calls) {
          // Step 3: call the function
          // Note: the JSON response may not always be valid; be sure to handle errors
          const availableFunctions = {
            verify_smart_contract: verifySmartContract,
            check_smart_contract_safety: checkSmartContractSafety,
          }; // only one function in this example, but you can have multiple
          messages.push(responseMessage); // extend conversation with assistant's reply
          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionResponse = await functionToCall(functionArgs.contractAddress);
            console.log("functionResponse: ", functionResponse);
            // setMessages([
            //   ...chatMessages,
            //   {
            //     tool_call_id: toolCall.id,
            //     role: "tool",
            //     name: functionName,
            //     content: functionResponse,
            //   },
            // ]);
            const newMessages = [
              systemMessage, // The system message DEFINES the logic of our chatGPT
              ...apiMessages, // The messages from our chat with ChatGPT
              {
                role: "assistant",
                content: `You have ran the function ${functionName} on the smart contract, here are the results: ${functionResponse}. Inform the user of the results.`,
              },
            ];
            console.log("newMessages: ", newMessages);
            const secondResponse = await openai.chat.completions.create({
              model: "gpt-3.5-turbo-0125",
              messages: newMessages,
            }); // get a new response from the model where it can see the function response
            console.log(messages);
            console.log("secondResponse: ", secondResponse);
            setMessages([
              ...chatMessages,
              {
                message: secondResponse.choices[0].message.content,
                sender: "ChatGPT",
              },
            ]);
          }
        } else {
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
        }
        setIsTyping(false);
        console.log(messages);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", maxWidth: "700px", height: "690px" }}>
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar
                src="/LOGO.png"
                name="Izanagi"
              />
              <ConversationHeader.Content userName="Izanagi" />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Izanagi is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
      {proof && (
  <div style={{ textAlign: 'left' }}>
        <p>Last Generated Proof:</p>

    <p>Proof String: {proofString.slice(0,100)}...</p>
    <button onClick={() => {
      navigator.clipboard.writeText(proofString);
      alert("Proof copied to clipboard!")
      }}
>Copy Full Proof to Clipboard</button>
<br />
<br />
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {JSON.stringify(proof, null, 2)}
    </pre>
    
  </div>
)}

    </div>
  );
}

export default App;
