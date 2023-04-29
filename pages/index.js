/* --------------------------------- imports -------------------------------- */
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import collected from "./api/collectedData";

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */
export default function Home() {
  /* -------------------------------- useStates ------------------------------- */
  // const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [chords, setChords] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState("");

  const [subjectInput, setSubjectInput] = useState("");
  const testResponse = {
    result:
      "\nTender, juicy beef\nCuts like butter, melts in mouth\nA savory delight!",
  };
  /* ---------------------------- extract function ---------------------------- */
  function extract(input) {
    // Extract the string of lyrics and chords from the input object
    const songData = input;

    // Split the string into individual lines
    const lines = songData.split("\n");
    const lyrics = lines.slice(0, 3);
    const chords = lines.slice(4, 7);
    setLyrics(lines.slice(0, 3));
    setChords(lines.slice(4, 7));
   
  }
  console.log("result", result);
  console.log("data", data);
  /* ----------------------------- submit function ---------------------------- */
  //submit post and setResult
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subjectInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setData(data);
      setResult(data.result);
      extract(data.result);
      setSubjectInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Haiku Subject</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a subject"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <input type="submit" value="Generate haiku" />
        </form>
        <div className={styles.result}>{result}</div>
        <p>{lyrics[0]}</p>
        <h3>{chords[0]}</h3>
        <p>{lyrics[1]}</p>
        <h3>{chords[1]}</h3>
        <p>{lyrics[2]}</p>
        <h3>{chords[2]}</h3>
      </main>
    </div>
  );
}
