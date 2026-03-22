import * as React from 'react'
import { Badge, Box, Stack } from 'signal'

interface TickerItem {
  pair: string
  price: string
  change: string
  positive: boolean
}

const INITIAL: TickerItem[] = [
  { pair: 'EUR/USD', price: '1.08642', change: '+0.0012', positive: true },
  { pair: 'GBP/USD', price: '1.26871', change: '-0.0034', positive: false },
  { pair: 'USD/JPY', price: '149.832', change: '+0.421', positive: true },
  { pair: 'USD/CHF', price: '0.89241', change: '-0.0008', positive: false },
  { pair: 'AUD/USD', price: '0.64813', change: '+0.0021', positive: true },
  { pair: 'USD/CAD', price: '1.35724', change: '+0.0044', positive: true },
  { pair: 'NZD/USD', price: '0.59416', change: '-0.0017', positive: false },
  { pair: 'EUR/GBP', price: '0.85631', change: '+0.0007', positive: true },
  { pair: 'EUR/JPY', price: '162.741', change: '+0.341', positive: true },
  { pair: 'GBP/JPY', price: '190.124', change: '-0.213', positive: false },
]

function nudge(price: string): string {
  const n = parseFloat(price)
  const delta = (Math.random() - 0.5) * 0.0004
  return (n + delta).toFixed(price.split('.')[1]?.length ?? 4)
}

export function MarketTicker() {
  const [items, setItems] = React.useState(INITIAL)

  React.useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          price: nudge(item.price),
        }))
      )
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <Box component="section" className="trading-ticker" role="marquee" aria-label="Live FX rates">
      {items.map((item) => (
        <Stack
          key={item.pair}
          direction="row"
          alignItems="center"
          spacing="0.625rem"
          className="trading-ticker-item"
        >
          <span className="trading-ticker-item-pair">{item.pair}</span>
          <span className="trading-ticker-item-price">{item.price}</span>
          <Badge variant={item.positive ? 'success' : 'destructive'}>
            {item.change}
          </Badge>
        </Stack>
      ))}
    </Box>
  )
}
