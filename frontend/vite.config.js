//Imports Vite's config helper.
import { defineConfig } from 'vite'
//Imports the React plugin for Vite.
import react from '@vitejs/plugin-react'

//Exports the Vite's config object.
//defineConfig() provides IntelliSense and Validation in Editors.
export default defineConfig({
  //The React plugin enables fast refresh, JSX support and React optimisations.
  plugins: [react()],
})

/**
 * Vite was used with React because React needs a build tool
 * to transform JSX, modules and run a faster development server.
  */
