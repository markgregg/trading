import * as React from 'react'
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  Button,
  Badge,
  cn,
} from 'signal'

interface BlotterRow {
  id: string
  status: 'FILL' | 'REJ' | 'WRK'
  product: string
  ccy: string
  side: 'BUY' | 'SELL'
  execAmount: string
  execPrice: string
  spotPrice: string
  fwdPoints: string
  valueDate: string
  modifiedDate: string
  modifiedBy: string
  ref: string
}

const DATA: BlotterRow[] = [
  { id: 'b0', status: 'FILL', product: 'Spot', ccy: 'EURUSD', side: 'BUY', execAmount: '10,000,000 EUR', execPrice: '1.08642', spotPrice: '1.08640', fwdPoints: '', valueDate: '2026-03-23', modifiedDate: '2026-03-21 09:22:34', modifiedBy: 'weilands', ref: 'QOD123ABC001' },
  { id: 'b1', status: 'FILL', product: 'Fwd', ccy: 'CHFUSD', side: 'SELL', execAmount: '500,000 EUR', execPrice: '0.89241', spotPrice: '0.89238', fwdPoints: '5.00', valueDate: '2026-06-23', modifiedDate: '2026-03-21 09:18:11', modifiedBy: 'laneganm', ref: 'QOD123ABC002' },
  { id: 'b2', status: 'REJ', product: 'Fwd', ccy: 'GBPUSD', side: 'BUY', execAmount: '1,000,000 EUR', execPrice: '1.26871', spotPrice: '1.26870', fwdPoints: '', valueDate: '2026-04-21', modifiedDate: '2026-03-21 09:15:55', modifiedBy: 'smitht', ref: 'QOD123ABC003' },
  { id: 'b3', status: 'WRK', product: 'Spot', ccy: 'USDJPY', side: 'BUY', execAmount: '2,000,000 USD', execPrice: '149.832', spotPrice: '149.831', fwdPoints: '', valueDate: '2026-03-23', modifiedDate: '2026-03-21 09:10:02', modifiedBy: 'weilands', ref: 'QOD123ABC004' },
  { id: 'b4', status: 'FILL', product: 'Spot', ccy: 'AUDUSD', side: 'SELL', execAmount: '3,000,000 AUD', execPrice: '0.64813', spotPrice: '0.64810', fwdPoints: '', valueDate: '2026-03-23', modifiedDate: '2026-03-21 08:55:14', modifiedBy: 'johnsona', ref: 'QOD123ABC005' },
  { id: 'b5', status: 'FILL', product: 'Spot', ccy: 'EURUSD', side: 'SELL', execAmount: '5,000,000 EUR', execPrice: '1.08520', spotPrice: '1.08518', fwdPoints: '', valueDate: '2026-03-23', modifiedDate: '2026-03-21 08:41:39', modifiedBy: 'laneganm', ref: 'QOD123ABC006' },
  { id: 'b6', status: 'WRK', product: 'Fwd', ccy: 'USDCAD', side: 'SELL', execAmount: '1,500,000 USD', execPrice: '1.35724', spotPrice: '1.35720', fwdPoints: '12.50', valueDate: '2026-09-21', modifiedDate: '2026-03-21 08:30:00', modifiedBy: 'smitht', ref: 'QOD123ABC007' },
]

const col = createColumnHelper<BlotterRow>()

const columns = [
  col.display({
    id: 'select',
    header: ({ table }) => (
      <div className="trading-blotter-select-cell">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="trading-blotter-select-cell"
        data-in-selected-row={row.getIsSelected() || undefined}
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      </div>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as BlotterRow['status']
      const sel = row.getIsSelected()
      return (
        <div
          className={cn(
            'trading-blotter-pill',
            `trading-blotter-status-${status.toLowerCase()}`,
            sel && 'trading-blotter-pill-selected'
          )}
        >
          {status}
        </div>
      )
    },
  }),
  col.accessor('product', {
    header: 'Product',
    cell: ({ row }) => <span className="text-data-category">{row.getValue('product')}</span>,
  }),
  col.accessor('ccy', {
    header: 'CCY Pair',
    cell: ({ row }) => <span className="text-data-currency">{row.getValue('ccy')}</span>,
  }),
  col.accessor('side', {
    header: 'Side',
    cell: ({ row }) => {
      const side = row.getValue('side') as BlotterRow['side']
      const sel = row.getIsSelected()
      return (
        <div
          className={cn(
            'trading-blotter-pill',
            `trading-blotter-side-${side.toLowerCase()}`,
            sel && 'trading-blotter-pill-selected'
          )}
        >
          {side}
        </div>
      )
    },
  }),
  col.accessor('execAmount', {
    header: 'Exec Amount',
    cell: ({ row }) => <span className="text-data-primary">{row.getValue('execAmount')}</span>,
    meta: { align: 'right' },
  }),
  col.accessor('execPrice', {
    header: 'Exec Price',
    cell: ({ row }) => <span className="text-data-primary">{row.getValue('execPrice')}</span>,
    meta: { align: 'right' },
  }),
  col.accessor('spotPrice', {
    header: 'Spot Price',
    cell: ({ row }) => <span className="text-data-primary">{row.getValue('spotPrice')}</span>,
    meta: { align: 'right' },
  }),
  col.accessor('fwdPoints', {
    header: 'Fwd Points',
    cell: ({ row }) => <span className="text-data-secondary">{row.getValue('fwdPoints')}</span>,
  }),
  col.accessor('valueDate', {
    header: 'Value Date',
    cell: ({ row }) => <span className="text-data-datetime">{row.getValue('valueDate')}</span>,
  }),
  col.accessor('modifiedDate', {
    header: 'Modified',
    cell: ({ row }) => <span className="text-data-datetime">{row.getValue('modifiedDate')}</span>,
  }),
  col.accessor('modifiedBy', {
    header: 'Modified By',
    cell: ({ row }) => <span>{row.getValue('modifiedBy')}</span>,
  }),
  col.accessor('ref', {
    header: 'Reference',
    cell: ({ row }) => (
      <span style={{ color: 'var(--data-identifier, var(--muted-foreground))' }}>
        {row.getValue('ref')}
      </span>
    ),
  }),
]

export function TradingBlotter() {
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({ b3: true })

  const table = useReactTable({
    data: DATA,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    getRowId: (row) => row.id,
  })

  const selectedCount = Object.values(rowSelection).filter(Boolean).length

  return (
    <div className="blotter-section">
      <div className="blotter-toolbar">
        <span className="blotter-toolbar-title">Trade Blotter</span>
        {selectedCount > 0 && (
          <>
            <Badge variant="secondary">{selectedCount} selected</Badge>
            <Button variant="outline" size="sm">
              Amend
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </>
        )}
        <span className="blotter-toolbar-count">{DATA.length} trades</span>
        <Button variant="ghost" size="sm">
          Export
        </Button>
      </div>

      <div className="trading-blotter-shell">
        <div className="trading-blotter-scroll">
          {/* Use signal's Table but with custom blotter classes to avoid double-wrapper */}
          <table className="trading-blotter-table">
            <thead className="trading-blotter-header">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="trading-blotter-header-row">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'trading-blotter-header-cell',
                        (header.column.columnDef.meta as { align?: string })?.align === 'right' &&
                          'trading-blotter-align-right'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className="trading-blotter-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          'trading-blotter-cell',
                          (cell.column.columnDef.meta as { align?: string })?.align === 'right' &&
                            'trading-blotter-align-right'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="trading-blotter-empty-row">
                  <td colSpan={columns.length} className="trading-blotter-empty-cell">
                    No trades found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
