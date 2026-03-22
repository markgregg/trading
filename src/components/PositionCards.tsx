import { Badge, Box, Card, CardContent, CardHeader, CardTitle, Grid, Stack } from 'signal'

interface Position {
  pair: string
  side: 'LONG' | 'SHORT'
  size: string
  pnl: string
  pnlValue: number
  avgPrice: string
  currentPrice: string
}

const POSITIONS: Position[] = [
  {
    pair: 'EUR/USD',
    side: 'LONG',
    size: '10,000,000',
    pnl: '+$12,430',
    pnlValue: 12430,
    avgPrice: '1.08520',
    currentPrice: '1.08644',
  },
  {
    pair: 'GBP/USD',
    side: 'SHORT',
    size: '5,000,000',
    pnl: '-$3,210',
    pnlValue: -3210,
    avgPrice: '1.26530',
    currentPrice: '1.26874',
  },
  {
    pair: 'USD/JPY',
    side: 'LONG',
    size: '2,000,000',
    pnl: '+$8,900',
    pnlValue: 8900,
    avgPrice: '149.410',
    currentPrice: '149.832',
  },
]

const SUMMARY = [
  { label: 'Day P&L', value: '+$18,120', positive: true },
  { label: 'Open P&L', value: '+$22,640', positive: true },
  { label: 'Net Exposure', value: '$17.0M', positive: null },
]

export function PositionCards() {
  return (
    <Stack spacing={1.5}>
      {/* Summary strip */}
      <Grid container spacing={1} className="position-cards-grid">
        {SUMMARY.map((s) => (
          <Grid key={s.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card size="sm">
              <CardContent>
                <Stack spacing="0.25rem">
                  <div
                className={[
                  'position-card-value',
                  s.positive === true
                    ? 'text-positive'
                    : s.positive === false
                      ? 'text-negative'
                      : '',
                ].join(' ')}
                  >
                    {s.value}
                  </div>
                  <div className="position-card-label">{s.label}</div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Open positions */}
      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack spacing="0.25rem">
            {POSITIONS.map((pos) => (
              <Box key={pos.pair} className="position-row">
                <span className="position-row-key" style={{ fontWeight: 600, minWidth: 80 }}>
                  {pos.pair}
                </span>
                <Badge
                  variant={pos.side === 'LONG' ? 'success' : 'destructive'}
                  style={{ fontSize: 'var(--ds-text-xs)' }}
                >
                  {pos.side}
                </Badge>
                <span className="position-row-val" style={{ flex: 1, textAlign: 'right' }}>
                  {pos.size}
                </span>
                <span
                  className={[
                    'position-row-val',
                    pos.pnlValue >= 0 ? 'text-positive' : 'text-negative',
                  ].join(' ')}
                  style={{ minWidth: 80, textAlign: 'right' }}
                >
                  {pos.pnl}
                </span>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
