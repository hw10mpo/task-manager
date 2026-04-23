//StrictMode is used for Additional Checks and Warning During the Development Process.
//It'll Help Catch Mistakes and Issues Early On in Development.
import { StrictMode } from 'react'

//createRoot is the Modern React API for mounting the application.
//This replaces the older ReactDOM.render() method.
import { createRoot } from 'react-dom/client'

//Global CSS for the Entire React Application.
//Vite Bundles this File.
import './index.css'

//Imports the Root Component of the Application.
//This is the Component that React Renders First.
import App from './app.jsx'

//Finds the <div id="root> in the index.html file and mounts the React App into it.
//React takes Control of Everything inside this Element.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
