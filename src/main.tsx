import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { webVitalsOptimizer } from './utils/performance/webVitalsOptimizer'

// Initialize Core Web Vitals optimizations
webVitalsOptimizer.initialize();

createRoot(document.getElementById("root")!).render(<App />);
