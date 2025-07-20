import { treaty } from '@elysiajs/eden'
import type { ApiType, ListResponseType } from './../../server/src/index'
import { useState } from 'react'
import glasses from './assets/3d.svg'
import './App.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "localhost:3000"

const api = treaty<ApiType>(SERVER_URL);

function App() {
  const [data, setData] = useState<ListResponseType | null>(null)

  async function sendRequest() {
    try {
      const res = await api.list({ 'skibidi': 22 }).get();
      console.log("Response ", res);


      if (res.status !== 200 && !res.data) {
        console.log("Error fetching data")
        return
      }
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://github.com/w1ckedmellow/BERV" target="_blank">
          <img src={glasses} className="logo" alt="glasses logo" />
        </a>
      </div>
      <h1>BERV</h1>
      <h2>Bun + Elysia + React + Vite</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="card">
        <div className='button-container'>
          <button onClick={sendRequest}>
            Call API
          </button>
        </div>
        {data && (
          <pre className='response'>
            Message: <br />
            <code>
              {JSON.stringify(data)}
            </code>
          </pre>
        )}
      </div>
    </>
  )
}

export default App