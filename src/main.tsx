
import { createRoot } from 'react-dom/client'
import { initBlockchain } from './services/blockchain';
import App from './App.tsx'
import './index.css'

// Initialize blockchain connection on app startup
initBlockchain().catch(error => {
  console.error("Failed to initialize blockchain connection:", error);
});

createRoot(document.getElementById("root")!).render(<App />);
