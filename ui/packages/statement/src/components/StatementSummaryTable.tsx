import React from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { StatementDetailInfo } from './statement-types'
import { useTranslation } from 'react-i18next'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import sqlFormatter from 'sql-formatter-plus'

type align = 'left' | 'right' | 'center'

const columns = [
  {
    title: 'kind',
    dataIndex: 'kind',
    key: 'kind',
    align: 'center' as align,
    width: 160,
  },
  {
    title: 'content',
    dataIndex: 'content',
    key: 'content',
    align: 'left' as align,
  },
]

type Props = {
  detail: StatementDetailInfo
  beginTime: string
  endTime: string
}

export default function StatementSummaryTable({
  detail,
  beginTime,
  endTime,
}: Props) {
  const { t } = useTranslation()

  const dataSource = [
    {
      kind: t('statement.common.schemas'),
      content: detail.schemas,
    },
    {
      kind: t('statement.detail.time_range'),
      content: `${beginTime} ~ ${endTime}`,
    },
    {
      kind: t('statement.common.digest_text'),
      content: (
        <SyntaxHighlighter language="sql" style={atomOneLight}>
          {sqlFormatter.format(detail.digest_text, { uppercase: true })}
        </SyntaxHighlighter>
      ),
    },
    {
      kind: t('statement.detail.query_sample_text'),
      content: (
        <SyntaxHighlighter language="sql" style={atomOneLight}>
          {sqlFormatter.format(detail.query_sample_text, { uppercase: true })}
        </SyntaxHighlighter>
      ),
    },
    {
      kind: t('statement.detail.last_seen'),
      content: moment(detail.last_seen).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="kind"
      pagination={false}
      showHeader={false}
    />
  )
}
