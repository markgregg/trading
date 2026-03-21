import { ThemeProvider } from 'signal'
import { Header } from './components/Header'
import { MarketTicker } from './components/MarketTicker'
import { TradingWorkspace } from './components/TradingWorkspace'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" defaultDensity="high">
      <div className="trading-app">
        <Header />
        <MarketTicker />
        <TradingWorkspace />
      </div>
    </ThemeProvider>
  )
}
