import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  Badge,
} from 'signal'

const chartData = [
  { time: '09:00', bid: 1.0841, ask: 1.0843 },
  { time: '09:15', bid: 1.0856, ask: 1.0858 },
  { time: '09:30', bid: 1.0849, ask: 1.0851 },
  { time: '09:45', bid: 1.0862, ask: 1.0864 },
  { time: '10:00', bid: 1.0875, ask: 1.0877 },
  { time: '10:15', bid: 1.0868, ask: 1.087 },
  { time: '10:30', bid: 1.0882, ask: 1.0884 },
  { time: '10:45', bid: 1.0871, ask: 1.0873 },
  { time: '11:00', bid: 1.0859, ask: 1.0861 },
  { time: '11:15', bid: 1.0844, ask: 1.0846 },
  { time: '11:30', bid: 1.0851, ask: 1.0853 },
  { time: '11:45', bid: 1.0866, ask: 1.0868 },
  { time: '12:00', bid: 1.0864, ask: 1.0866 },
]

const chartConfig: ChartConfig = {
  bid: { label: 'Bid', color: 'var(--data-value-positive, oklch(0.6 0.17 142))' },
  ask: { label: 'Ask', color: 'var(--data-value-negative, oklch(0.6 0.2 25))' },
}

const latest = chartData[chartData.length - 1]
const open = chartData[0].bid
const current = latest.bid
const change = current - open
const changePct = ((change / open) * 100).toFixed(4)
const positive = change >= 0

export function PriceChart() {
  return (
    <Card className="chart-panel">
      <CardHeader>
        <CardTitle
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <span>EUR/USD</span>
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 'var(--ds-text-xl)',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            }}
          >
            {latest.bid.toFixed(5)}
          </span>
          <Badge variant={positive ? 'success' : 'destructive'}>
            {positive ? '+' : ''}
            {change.toFixed(5)} ({positive ? '+' : ''}
            {changePct}%)
          </Badge>
          <span
            style={{
              fontSize: 'var(--ds-text-xs)',
              color: 'var(--muted-foreground)',
              marginLeft: 'auto',
            }}
          >
            Intraday · 15 min
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height: 200, width: '100%' }}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="bidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bid)"
                  stopOpacity={0.25}
                />
                <stop offset="95%" stopColor="var(--color-bid)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => v.toFixed(4)}
              tick={{ fontSize: 10 }}
              width={52}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ReferenceLine y={open} stroke="var(--border)" strokeDasharray="4 2" />
            <Area
              dataKey="bid"
              type="monotone"
              stroke="var(--color-bid)"
              strokeWidth={1.5}
              fill="url(#bidGrad)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
