import "./App.css";

import { provider, CitizenContract } from "./contract";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputNameValue, setInputNameValue] = useState("");
  const [citizens, setCitizens] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputNameChange = (event) => {
    setInputNameValue(event.target.value);
  };

  const getCitizens = async () => {
    try {
      const events = await CitizenContract.queryFilter("Citizen");
      const formattedCitizens = events.map((event) => ({
        id: ethers.formatUnits(event.args[0], 0),
        name: event.args[3].toString(),
      }));
      setCitizens(formattedCitizens);
    } catch (error) {
      console.error(error);
    }
  };

  const addPerson = async () => {
    try {
      const signer = await provider.getSigner();
      const contractWithSigner = CitizenContract.connect(signer);
      await contractWithSigner.addCitizen(
        100,
        "Warsaw",
        inputNameValue || "Some of Name",
        "Note"
      );
      setInputNameValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const getNote = async () => {
    setNote("");
    setError("");
    if (!inputValue) {
      setError("Can't be empty");
      return;
    }
    try {
      const resNote = await CitizenContract.getNoteByCitizenId(inputValue);
      setNote(resNote);
    } catch (error) {
      setError(error.reason);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div
          style={{
            display: "flex",
            gap: 20,
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <button onClick={getCitizens}>Fetch all citizens</button>
          <div style={{ display: "flex", gap: 20 }}>
            <button onClick={addPerson}>Add citizen</button>
            <input
              type="text"
              value={inputNameValue}
              onChange={handleInputNameChange}
              placeholder="User name"
            />
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <button onClick={getNote}>Get citizen note</button>
            <input
              type="number"
              value={inputValue}
              onChange={handleChange}
              placeholder="User id"
            />
          </div>
        </div>

        <div style={{ height: 200 }}>
          {note && <div style={{ marginTop: 24 }}>Note: {note}</div>}
          {error && <div style={{ marginTop: 24, color: "red" }}>{error}</div>}
        </div>

        <b>List of citizens:</b>

        {citizens.length ? (
          <div
            style={{
              background: "grey",
              height: 200,
              overflowY: "auto",
              padding: "0 10px",
              width: 200,
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {citizens.map((person) => (
                <li style={{ textAlign: "start" }} key={person.id}>
                  {person.id} - {person.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Try to fetch 🥲</div>
        )}
      </div>
    </div>
  );
}

export default App;
