import { useState } from 'react'
import beaver from './assets/beaver.svg'
import './App.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

const client = hcWithType(SERVER_URL);

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function App() {
  const [data, setData] = useState<Awaited<ReturnType<ResponseType["json"]>> | undefined>()

  async function sendRequest() {
    try {
      const res = await client.hello.$get()
      if (!res.ok) {
        console.log("Error fetching data")
        return
      }
      const data = await res.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://github.com/stevedylandev/bhvr" target="_blank">
          <img src={beaver} className="logo" alt="beaver logo" />
        </a>
      </div>
      <h1>bhvr</h1>
      <h2>Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="card">
        <div className='button-container'>
          <button onClick={sendRequest}>
            Call API
          </button>
          <a className='docs-link' target='_blank' href="https://bhvr.dev">Docs</a>
        </div>
        {data && (
          <pre className='response'>
            <code>
              Message: {data.message} <br />
              Success: {data.success.toString()}
            </code>
          </pre>
        )}
      </div>
    </>
  )
}

export default App