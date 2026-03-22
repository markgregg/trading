import * as React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Grid,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
  Progress,
  Separator,
  Slider,
  Stack,
} from 'signal'

const INSTRUMENTS = [
  { value: 'eurusd', label: 'EUR/USD' },
  { value: 'gbpusd', label: 'GBP/USD' },
  { value: 'usdjpy', label: 'USD/JPY' },
  { value: 'usdchf', label: 'USD/CHF' },
  { value: 'audusd', label: 'AUD/USD' },
  { value: 'usdcad', label: 'USD/CAD' },
]

const TENORS = [
  { value: 'spot', label: 'Spot (T+2)' },
  { value: 'tom', label: 'Tom (T+1)' },
  { value: 'tod', label: 'Today (T+0)' },
  { value: '1w', label: '1 Week' },
  { value: '1m', label: '1 Month' },
  { value: '3m', label: '3 Months' },
]

export function OrderEntry() {
  const [side, setSide] = React.useState<'BUY' | 'SELL'>('BUY')
  const [quantity, setQuantity] = React.useState('1,000,000')
  const [sliderValue, setSliderValue] = React.useState([25])
  const [gtc, setGtc] = React.useState(false)
  const [limitOrder, setLimitOrder] = React.useState(false)
  const [riskPct] = React.useState(62)

  const handleQuantitySlider = (value: number[]) => {
    const val = value[0] ?? 0
    setSliderValue([val])
    const amounts = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000]
    const idx = Math.floor((val / 100) * (amounts.length - 1))
    setQuantity(amounts[Math.min(idx, amounts.length - 1)].toLocaleString())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Order Entry</span>
          <ButtonGroup>
            <Button
              variant={side === 'BUY' ? 'success' : 'outline'}
              size="sm"
              onClick={() => setSide('BUY')}
            >
              BUY
            </Button>
            <Button
              variant={side === 'SELL' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setSide('SELL')}
            >
              SELL
            </Button>
          </ButtonGroup>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Stack spacing="0.625rem" className="order-entry-body">
          {/* Instrument */}
          <Stack spacing="0.3rem" className="order-entry-field">
            <Label htmlFor="oe-instrument">Instrument</Label>
            <Select defaultValue="eurusd">
              <SelectTrigger id="oe-instrument">
                <SelectValue placeholder="Select pair" />
              </SelectTrigger>
              <SelectContent>
                {INSTRUMENTS.map((inst) => (
                  <SelectItem key={inst.value} value={inst.value}>
                    {inst.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Stack>

          {/* Tenor */}
          <Stack spacing="0.3rem" className="order-entry-field">
            <Label htmlFor="oe-tenor">Tenor</Label>
            <Select defaultValue="spot">
              <SelectTrigger id="oe-tenor">
                <SelectValue placeholder="Select tenor" />
              </SelectTrigger>
              <SelectContent>
                {TENORS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Stack>

          {/* Quantity + slider */}
          <Stack spacing="0.3rem" className="order-entry-field">
            <Label htmlFor="oe-qty">Notional Amount</Label>
            <Input
              id="oe-qty"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ fontFamily: 'ui-monospace, monospace' }}
            />
            <div className="order-entry-slider-row">
              <span className="order-entry-slider-label">100K</span>
              <Slider
                min={0}
                max={100}
                step={25}
                value={sliderValue}
                onValueChange={(value) => handleQuantitySlider(Array.isArray(value) ? value : [value])}
                style={{ flex: 1 }}
                aria-label="Adjust notional amount"
              />
              <span className="order-entry-slider-label">10M</span>
            </div>
          </Stack>

          {/* Limit price (conditional) */}
          {limitOrder && (
            <Stack spacing="0.3rem" className="order-entry-field">
              <Label htmlFor="oe-limit">Limit Price</Label>
              <Input
                id="oe-limit"
                placeholder="1.08642"
                style={{ fontFamily: 'ui-monospace, monospace' }}
              />
            </Stack>
          )}

          <Separator />

          {/* Switches */}
          <Box className="order-entry-switch-row">
            <span className="order-entry-switch-label">Good Till Cancel</span>
            <Switch
              checked={gtc}
              onCheckedChange={(v) => setGtc(!!v)}
              aria-label="Good till cancel"
            />
          </Box>
          <Box className="order-entry-switch-row">
            <span className="order-entry-switch-label">Limit Order</span>
            <Switch
              checked={limitOrder}
              onCheckedChange={(v) => setLimitOrder(!!v)}
              aria-label="Limit order"
            />
          </Box>

          {/* Risk utilization */}
          <Stack spacing="0.3rem" className="order-entry-risk">
            <Box className="order-entry-risk-label">
              <span>Risk Utilization</span>
              <span>{riskPct}%</span>
            </Box>
            <Progress value={riskPct} />
          </Stack>

          {/* Submit actions */}
          <Grid container columns={2} columnSpacing={1} className="order-entry-actions">
            <Grid>
              <Button
                variant={side === 'BUY' ? 'success' : 'destructive'}
                style={{ width: '100%', fontWeight: 700, letterSpacing: '0.04em' }}
              >
                {side} EUR/USD
              </Button>
            </Grid>
            <Grid>
              <Button variant="outline" style={{ width: '100%' }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  )
}
