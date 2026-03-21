import * as React from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Switch,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Alert,
} from 'signal'
import { OrderEntry } from './OrderEntry'
import { PriceChart } from './PriceChart'
import { TradingBlotter } from './TradingBlotter'
import { PositionCards } from './PositionCards'

function PositionsTab() {
  const positions = [
    { pair: 'EUR/USD', side: 'LONG', size: '10,000,000', avg: '1.08520', current: '1.08644', pnl: '+$12,430', pnlVal: 12430 },
    { pair: 'GBP/USD', side: 'SHORT', size: '5,000,000', avg: '1.26530', current: '1.26874', pnl: '-$3,210', pnlVal: -3210 },
    { pair: 'USD/JPY', side: 'LONG', size: '2,000,000', avg: '149.410', current: '149.832', pnl: '+$8,900', pnlVal: 8900 },
    { pair: 'AUD/USD', side: 'SHORT', size: '3,000,000', avg: '0.64950', current: '0.64813', pnl: '+$4,110', pnlVal: 4110 },
    { pair: 'USD/CAD', side: 'LONG', size: '1,500,000', avg: '1.35500', current: '1.35724', pnl: '+$2,490', pnlVal: 2490 },
  ]

  return (
    <div className="positions-grid">
      {positions.map((pos) => (
        <Card key={pos.pair}>
          <CardHeader>
            <CardTitle
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span className="text-data-currency">{pos.pair}</span>
              <Badge variant={pos.side === 'LONG' ? 'success' : 'destructive'}>
                {pos.side}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="position-row">
              <span className="position-row-key">Size</span>
              <span className="position-row-val">{pos.size}</span>
            </div>
            <div className="position-row">
              <span className="position-row-key">Avg Price</span>
              <span className="position-row-val">{pos.avg}</span>
            </div>
            <div className="position-row">
              <span className="position-row-key">Current</span>
              <span className="position-row-val">{pos.current}</span>
            </div>
            <div className="position-row">
              <span className="position-row-key">Unrealised P&L</span>
              <span
                className={['position-row-val', pos.pnlVal >= 0 ? 'text-positive' : 'text-negative'].join(' ')}
              >
                {pos.pnl}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SettingsTab() {
  const [soundAlerts, setSoundAlerts] = React.useState(true)
  const [emailConfirm, setEmailConfirm] = React.useState(false)
  const [autoHedge, setAutoHedge] = React.useState(false)
  const [showTooltips, setShowTooltips] = React.useState(true)

  return (
    <div className="settings-grid">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="settings-label-title">Sound Alerts</span>
              <span className="settings-label-desc">Play audio on order fill</span>
            </div>
            <Switch
              checked={soundAlerts}
              onCheckedChange={(v) => setSoundAlerts(!!v)}
              aria-label="Sound alerts"
            />
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="settings-label-title">Email Confirmations</span>
              <span className="settings-label-desc">Send email on each trade</span>
            </div>
            <Switch
              checked={emailConfirm}
              onCheckedChange={(v) => setEmailConfirm(!!v)}
              aria-label="Email confirmations"
            />
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="settings-label-title">Tooltips</span>
              <span className="settings-label-desc">Show contextual help</span>
            </div>
            <Switch
              checked={showTooltips}
              onCheckedChange={(v) => setShowTooltips(!!v)}
              aria-label="Tooltips"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="settings-row">
            <div className="settings-row-label">
              <span className="settings-label-title">Auto Hedge</span>
              <span className="settings-label-desc">Hedge open positions automatically</span>
            </div>
            <Switch
              checked={autoHedge}
              onCheckedChange={(v) => setAutoHedge(!!v)}
              aria-label="Auto hedge"
            />
          </div>
          <div className="settings-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.375rem' }}>
            <div className="settings-row-label">
              <span className="settings-label-title">Risk Limit Breach</span>
              <span className="settings-label-desc">Action on limit breach</span>
            </div>
            <Select defaultValue="warn">
              <SelectTrigger style={{ width: '100%' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warn">Warn only</SelectItem>
                <SelectItem value="block">Block orders</SelectItem>
                <SelectItem value="liquidate">Auto liquidate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="settings-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.375rem' }}>
            <Label>Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger style={{ width: '100%' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="settings-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.375rem', marginTop: '0.5rem' }}>
            <Label>Date Format</Label>
            <Select defaultValue="iso">
              <SelectTrigger style={{ width: '100%' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iso">ISO 8601 (YYYY-MM-DD)</SelectItem>
                <SelectItem value="us">US (MM/DD/YYYY)</SelectItem>
                <SelectItem value="eu">EU (DD/MM/YYYY)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Signal FX</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            Built with <strong>Signal</strong> component library — a token-driven design system
            with light/dark themes and high/super-high density modes.
          </Alert>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div className="position-row">
              <span className="position-row-key">Version</span>
              <span className="position-row-val">0.1.0</span>
            </div>
            <div className="position-row">
              <span className="position-row-key">Signal</span>
              <span className="position-row-val">0.1.0</span>
            </div>
            <div className="position-row">
              <span className="position-row-key">React</span>
              <span className="position-row-val">18</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function TradingWorkspace() {
  return (
    <div className="trading-workspace">
      <Tabs defaultValue="dashboard" className="trading-content">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="blotter">Blotter</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="trading-dashboard-grid">
              <OrderEntry />
              <div className="trading-right-panels">
                <PriceChart />
                <PositionCards />
              </div>
            </div>
            <TradingBlotter />
          </div>
        </TabsContent>

        {/* Blotter */}
        <TabsContent value="blotter">
          <TradingBlotter />
        </TabsContent>

        {/* Positions */}
        <TabsContent value="positions">
          <PositionsTab />
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
