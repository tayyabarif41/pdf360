import React from 'react';
import {
  Document,
  Page,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
  },
  headerTitle: { fontSize: 13, color: '#1B365D', fontWeight: 'bold' },
  headerDate: { fontSize: 8, color: '#64748b' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    width: '49%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1B365D',
    marginBottom: 6,
  },
  tableSection: {
    marginTop: 6,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableRow: { flexDirection: 'row' },
  tableColHeader: {
    backgroundColor: '#1B365D',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cbd5e0',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 7.5,
    textAlign: 'center',
  },
  tableCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e2e8f0',
    padding: 4,
    fontSize: 7,
    textAlign: 'center',
    color: '#334155',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 24,
    fontSize: 8,
    color: '#64748b',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 24,
    fontSize: 8,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
});

const PDFVerticalBarChart = ({ title }) => {
  const categories = [
    { label: 'Referrals', val: 200, color: '#1B365D' },
    { label: 'Rejected', val: 15, color: '#D9534F' },
    { label: 'Accepted', val: 185, color: '#888888' },
    { label: 'In progress', val: 45, color: '#337AB7' },
    { label: 'Overdue', val: 20, color: '#D9534F' },
    { label: 'Successful', val: 120, color: '#5CB85C' },
  ];

  return (
    <View style={pdfStyles.card}>
      <Text style={pdfStyles.cardTitle}>{title}</Text>
      <Svg height="110" width="350">
        {categories.map((item, index) => {
          const x = 10 + index * 54;
          const barHeight = (item.val / 200) * 65;
          const y = 80 - barHeight;

          return (
            <React.Fragment key={index}>
              <Text
                x={x + 5}
                y={y - 4}
                fontSize="6.5"
                fill={item.color}
                fontWeight="bold"
              >
                {item.val}
              </Text>
              <Rect
                x={x}
                y={y}
                width="28"
                height={barHeight}
                fill={item.color}
                rx="1"
              />
              <Text x={x - 2} y="92" fontSize="5.5" fill="#475569">
                {item.label}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const PDFConversionRatesChart = () => {
  const data = [
    { label: 'LC to EBS', val: 50.0 },
    { label: 'Inst to EBS', val: 57.0 },
    { label: 'MSME to EBS', val: 65.0 },
    { label: 'LC to Affluent', val: 30.0 },
    { label: 'Inst to Affluent', val: 70.0 },
    { label: 'MSME to Affluent', val: 25.0 },
    { label: 'LC to Private', val: 66.0 },
    { label: 'Inst to Private', val: 82.0 },
    { label: 'ME to Private', val: 19.0 },
    { label: 'Affluent to RC', val: 70.0 },
    { label: 'Private Bank to RC', val: 65.0 },
  ];

  return (
    <View style={pdfStyles.card}>
      <Text style={pdfStyles.cardTitle}>Conversion rates by Referrer:</Text>
      <Svg height="185" width="350">
        {data.map((item, index) => {
          const y = 4 + index * 16;
          const barWidth = (item.val / 100) * 200;

          return (
            <React.Fragment key={index}>
              <Text x="0" y={y + 7} fontSize="6" fill="#334155">
                {item.label}
              </Text>
              <Rect
                x="85"
                y={y}
                width={barWidth}
                height="8"
                fill="#5CB85C"
                rx="1"
              />
              <Text
                x={90 + barWidth}
                y={y + 7}
                fontSize="6"
                fill="#0f172a"
                fontWeight="bold"
              >
                {item.val.toFixed(1)}%
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const PDFBusinessSegmentsChart = () => {
  const data = [
    { label: 'Employee Banking', inProg: 15, overdue: 5 },
    { label: 'Affluent banking', inProg: 22, overdue: 4 },
    { label: 'Private Banking', inProg: 35, overdue: 7 },
    { label: 'Large Corporate', inProg: 11, overdue: 3 },
    { label: 'Institutional Banking', inProg: 19, overdue: 10 },
    { label: 'MSME', inProg: 8, overdue: 5 },
    { label: 'Riyad Capital', inProg: 12, overdue: 7 },
  ];

  return (
    <View style={pdfStyles.card}>
      <Text style={pdfStyles.cardTitle}>
        Referrals in progress and overdue by business segments
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: '#337AB7',
              marginRight: 3,
            }}
          />
          <Text style={{ fontSize: 6, color: '#475569' }}>In progress</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: '#D9534F',
              marginRight: 3,
            }}
          />
          <Text style={{ fontSize: 6, color: '#475569' }}>Overdue</Text>
        </View>
      </View>
      <Svg height="160" width="350">
        {data.map((item, index) => {
          const y = 6 + index * 21;
          const progWidth = item.inProg * 4;
          const overdueWidth = item.overdue * 4;
          const total = item.inProg + item.overdue;

          return (
            <React.Fragment key={index}>
              <Text x="0" y={y + 7} fontSize="6" fill="#334155">
                {item.label}
              </Text>
              <Rect
                x="85"
                y={y}
                width={progWidth}
                height="8"
                fill="#337AB7"
                rx="1"
              />
              <Text
                x="88"
                y={y + 6}
                fontSize="5"
                fill="#ffffff"
                fontWeight="bold"
              >
                {item.inProg}
              </Text>
              <Rect
                x={85 + progWidth}
                y={y}
                width={overdueWidth}
                height="8"
                fill="#D9534F"
                rx="1"
              />
              <Text
                x={88 + progWidth}
                y={y + 6}
                fontSize="5"
                fill="#ffffff"
                fontWeight="bold"
              >
                {item.overdue}
              </Text>
              <Text
                x={92 + progWidth + overdueWidth}
                y={y + 6}
                fontSize="6"
                fill="#0f172a"
                fontWeight="bold"
              >
                {total}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const PDFTable = ({ records }) => (
  <View style={pdfStyles.tableSection}>
    <Text style={pdfStyles.cardTitle}>
      Complete Referrals Data Table Records (1,000 Entries)
    </Text>
    <View style={pdfStyles.table}>
      <View style={[pdfStyles.tableRow, { backgroundColor: '#1B365D' }]} fixed>
        <Text style={[pdfStyles.tableColHeader, { width: '8%' }]}>ID</Text>
        <Text style={[pdfStyles.tableColHeader, { width: '22%' }]}>
          Customer Name
        </Text>
        <Text style={[pdfStyles.tableColHeader, { width: '25%' }]}>Email</Text>
        <Text style={[pdfStyles.tableColHeader, { width: '20%' }]}>
          Business Segment
        </Text>
        <Text style={[pdfStyles.tableColHeader, { width: '13%' }]}>Status</Text>
        <Text
          style={[
            pdfStyles.tableColHeader,
            { width: '12%', borderRightWidth: 0 },
          ]}
        >
          Amount
        </Text>
      </View>
      {records.map((row) => (
        <View style={pdfStyles.tableRow} key={row.id} wrap={false}>
          <Text style={[pdfStyles.tableCol, { width: '8%' }]}>{row.id}</Text>
          <Text
            style={[
              pdfStyles.tableCol,
              { width: '22%', textAlign: 'left', paddingLeft: 4 },
            ]}
          >
            {row.name}
          </Text>
          <Text
            style={[
              pdfStyles.tableCol,
              { width: '25%', textAlign: 'left', paddingLeft: 4 },
            ]}
          >
            {row.email}
          </Text>
          <Text
            style={[
              pdfStyles.tableCol,
              { width: '20%', textAlign: 'left', paddingLeft: 4 },
            ]}
          >
            {row.segment}
          </Text>
          <Text style={[pdfStyles.tableCol, { width: '13%' }]}>
            {row.status}
          </Text>
          <Text
            style={[
              pdfStyles.tableCol,
              { width: '12%', borderRightWidth: 0 },
            ]}
          >
            {row.amount}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const PDFPageNumber = () => (
  <Text
    style={pdfStyles.pageNumber}
    render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
    fixed
  />
);

export const DashboardPDF = ({ records }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <View style={pdfStyles.headerRow}>
          <Text style={pdfStyles.headerTitle}>
            Cross-Sell: CRM Referral Dashboard - Key Segment Summary
          </Text>
          <Text style={pdfStyles.headerDate}>Date: {currentDate}</Text>
        </View>
        <View style={pdfStyles.row}>
          <PDFVerticalBarChart title="Corporate to Retail Referrals (Date: from and to):-YYYY" />
          <PDFVerticalBarChart title="Retail to RC referrals (Date from and to):" />
        </View>
        <View style={pdfStyles.row}>
          <PDFConversionRatesChart />
          <PDFBusinessSegmentsChart />
        </View>
        <Text style={pdfStyles.footer}>Restricted - Internal Use Only</Text>
        <PDFPageNumber />
      </Page>

      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <View style={pdfStyles.headerRow}>
          <Text style={pdfStyles.headerTitle}>
            Cross-Sell: CRM Referral Dashboard - Audit Trail Records
          </Text>
          <Text style={pdfStyles.headerDate}>Date: {currentDate}</Text>
        </View>
        <PDFTable records={records} />
        <Text style={pdfStyles.footer}>Restricted - Internal Use Only</Text>
        <PDFPageNumber />
      </Page>
    </Document>
  );
};
