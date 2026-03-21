# Signal FX — Trading Interface Demo

A professional FX trading interface built with the **Signal** component library, demonstrating the full component set with theme and density controls.

## Features

- **Theme switching** — Light / Dark mode with persistent preference
- **Density modes** — High / Super High density with persistent preference
- **Live market ticker** — FX pair prices with animated updates
- **Order entry** — Full order form (instrument, tenor, notional, limit order, GTC)
- **Price chart** — EUR/USD intraday chart using Signal's ChartContainer + recharts
- **Trading blotter** — Multi-select table with status/side pills using @tanstack/react-table
- **Positions** — Open position cards with P&L
- **Settings** — App configuration with toggle controls

## Signal Components Used

| Component | Used in |
|-----------|---------|
| `ThemeProvider`, `useTheme` | App root, Header |
| `Button`, `ButtonGroup` | OrderEntry, Blotter toolbar |
| `Badge` | MarketTicker, PriceChart, Positions |
| `Card`, `CardHeader`, `CardContent`, `CardTitle` | All panels |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Main workspace |
| `Select` + `SelectItem` | OrderEntry, Settings |
| `Input` | OrderEntry |
| `Label` | OrderEntry, Settings |
| `Switch` | OrderEntry, Settings |
| `Progress` | OrderEntry risk meter |
| `Separator` | OrderEntry |
| `Checkbox` | Blotter row selection |
| `Alert` | Settings about panel |
| `ChartContainer`, `ChartTooltip` | PriceChart |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Theme & Density Controls

The **Light / Dark** and **High / Super High** density segmented buttons are visible in the top-right corner of the header. Preferences are persisted to `localStorage`.
