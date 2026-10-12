import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Svg, 
  Rect, 
  PDFDownloadLink 
} from '@react-pdf/renderer';

// Define styles for landscape dashboard layout including multi-page table styles
const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 15,
    marginBottom: 12,
    color: '#1a365d',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 6,
  },
  tableSection: {
    marginTop: 10,
    backgroundColor: '#f8fafc',
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
    borderColor: '#cbd5e0',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    backgroundColor: '#1b365d',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cbd5e0',
    padding: 6,
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
  },
  tableCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cbd5e0',
    padding: 5,
    fontSize: 7.5,
    textAlign: 'center',
    color: '#2d3748',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 25,
    fontSize: 8,
    color: '#718096',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 25,
    right: 25,
    textAlign: 'center',
    fontSize: 8,
    color: '#e53e3e',
    fontWeight: 'bold',
  }
});

// Reusable Workflow / Funnel Chart Component
const WorkflowChartComponent = ({ title }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Svg height="100" width="350">
      <Rect x="10" y="25" width="32" height="55" fill="#1b365d" rx="2" />
      <Text x="16" y="16" fontSize="8" fontWeight="bold" fill="#1b365d">200</Text>
      <Text x="5" y="95" fontSize="7" fill="#4a5568">Referrals</Text>

      <Rect x="52" y="42" width="26" height="18" fill="#e53e3e" rx="3" />
      <Text x="58" y="54" fontSize="7" fill="#ffffff" fontWeight="bold">-15</Text>
      <Text x="50" y="95" fontSize="7" fill="#e53e3e">Rejected</Text>

      <Rect x="90" y="30" width="32" height="50" fill="#718096" rx="2" />
      <Text x="96" y="20" fontSize="8" fontWeight="bold" fill="#718096">185</Text>
      <Text x="88" y="95" fontSize="7" fill="#4a5568">Accepted</Text>

      <Rect x="132" y="42" width="26" height="18" fill="#3182ce" rx="3" />
      <Text x="139" y="54" fontSize="7" fill="#ffffff" fontWeight="bold">45</Text>
      <Text x="127" y="95" fontSize="7" fill="#3182ce">In progress</Text>

      <Rect x="170" y="42" width="26" height="18" fill="#e53e3e" rx="3" />
      <Text x="176" y="54" fontSize="7" fill="#ffffff" fontWeight="bold">-20</Text>
      <Text x="170" y="95" fontSize="7" fill="#e53e3e">Overdue</Text>

      <Rect x="208" y="38" width="32" height="42" fill="#38a169" rx="2" />
      <Text x="214" y="28" fontSize="8" fontWeight="bold" fill="#38a169">120</Text>
      <Text x="204" y="95" fontSize="7" fill="#38a169">Successful</Text>
    </Svg>
  </View>
);

// Conversion Rates Horizontal Bar Chart Component
const ConversionRatesChart = () => {
  const data = [
    { label: "LC to EBS", val: 50 },
    { label: "Inst to EBS", val: 57 },
    { label: "MSME to EBS", val: 65 },
    { label: "LC to Affluent", val: 30 },
    { label: "Inst to Affluent", val: 70 },
    { label: "ME to Affluent", val: 25 },
    { label: "LC to Private", val: 66 },
    { label: "Inst to Private", val: 82 },
    { label: "ME to Private", val: 19 },
    { label: "Affluent to RC", val: 70 },
    { label: "Private to RC", val: 65 },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Conversion rates by Referrer:</Text>
      <Svg height="190" width="350">
        {data.map((item, index) => {
          const y = 8 + (index * 15);
          const barWidth = item.val * 2.0;
          return (
            <React.Fragment key={index}>
              <Text x="0" y={y + 7} fontSize="6.5" fill="#2d3748">{item.label}</Text>
              <Rect x="90" y={y} width={barWidth} height="8" fill="#38a169" rx="1" />
              <Text x={95 + barWidth} y={y + 7} fontSize="6.5" fill="#1a202c" fontWeight="bold">
                {item.val}.0%
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

// Referrals in Progress and Overdue by Business Segments Component
const SegmentBreakdownChart = () => {
  const data = [
    { label: "Employee Banking", inProg: 15, overdue: 5, total: 20 },
    { label: "Affluent banking", inProg: 22, overdue: 4, total: 26 },
    { label: "Private Banking", inProg: 35, overdue: 7, total: 42 },
    { label: "Large Corporate", inProg: 11, overdue: 3, total: 14 },
    { label: "Institutional Banking", inProg: 19, overdue: 10, total: 29 },
    { label: "MSME", inProg: 8, overdue: 5, total: 13 },
    { label: "Riyad Capital", inProg: 12, overdue: 7, total: 19 },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Referrals in progress and overdue by business segments:</Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <View style={{ width: 7, height: 7, backgroundColor: '#3182ce', marginRight: 3 }} />
          <Text style={{ fontSize: 6.5, color: '#4a5568' }}>In progress</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 7, height: 7, backgroundColor: '#e53e3e', marginRight: 3 }} />
          <Text style={{ fontSize: 6.5, color: '#4a5568' }}>Overdue</Text>
        </View>
      </View>

      <Svg height="165" width="350">
        {data.map((item, index) => {
          const y = 10 + (index * 21);
          const progWidth = item.inProg * 3.5;
          const overdueWidth = item.overdue * 3.5;
          return (
            <React.Fragment key={index}>
              <Text x="0" y={y + 7} fontSize="6.5" fill="#2d3748">{item.label}</Text>
              
              <Rect x="90" y={y} width={progWidth} height="8" fill="#3182ce" rx="1" />
              <Text x="93" y={y + 6} fontSize="5.5" fill="#ffffff" fontWeight="bold">{item.inProg}</Text>

              <Rect x={90 + progWidth} y={y} width={overdueWidth} height="8" fill="#e53e3e" rx="1" />
              <Text x={93 + progWidth} y={y + 6} fontSize="5.5" fill="#ffffff" fontWeight="bold">{item.overdue}</Text>

              <Text x={100 + progWidth + overdueWidth} y={y + 6} fontSize="6.5" fill="#1a202c" fontWeight="bold">
                {item.total}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

// Generate 1000 dummy records programmatically
const generateDummyData = () => {
  const segments = ["Employee Banking", "Affluent Banking", "Private Banking", "Large Corporate", "Institutional Banking", "MSME", "Riyad Capital"];
  const statuses = ["Successful", "In Progress", "Overdue", "Rejected"];
  
  return Array.from({ length: 1000 }, (_, index) => {
    const id = 10001 + index;
    const segment = segments[index % segments.length];
    const status = statuses[index % statuses.length];
    const amount = ((index * 37) % 500) + 50;
    return {
      id: `REF-${id}`,
      segment,
      status,
      amount: `$${amount},000`,
      date: `2026-10-${String((index % 28) + 1).padStart(2, '0')}`
    };
  });
};

const dummyRecords = generateDummyData();

// Large Table Component (1000 rows)
const LargeDataTableComponent = () => (
  <View style={styles.tableSection}>
    <Text style={styles.cardTitle}>Complete Referral Audit Trail (1,000 Records)</Text>
    <View style={styles.table}>
      <View style={[styles.tableRow, { backgroundColor: '#1b365d' }]} fixed>
        <Text style={[styles.tableColHeader, { width: '10%' }]}>#ID</Text>
        <Text style={[styles.tableColHeader, { width: '30%' }]}>Business Segment</Text>
        <Text style={[styles.tableColHeader, { width: '20%' }]}>Status</Text>
        <Text style={[styles.tableColHeader, { width: '20%' }]}>Deal Value</Text>
        <Text style={[styles.tableColHeader, { width: '20%', borderRightWidth: 0 }]}>Date Logged</Text>
      </View>
      
      {dummyRecords.map((row, index) => (
        <View style={styles.tableRow} key={index} wrap={false}>
          <Text style={[styles.tableCol, { width: '10%' }]}>{row.id}</Text>
          <Text style={[styles.tableCol, { width: '30%', textAlign: 'left', paddingLeft: 6 }]}>{row.segment}</Text>
          <Text style={[styles.tableCol, { width: '20%' }]}>{row.status}</Text>
          <Text style={[styles.tableCol, { width: '20%' }]}>{row.amount}</Text>
          <Text style={[styles.tableCol, { width: '20%', borderRightWidth: 0 }]}>{row.date}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Document Definition
const DashboardPDF = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.header}>Cross Sell: CRM Referral Dashboard - Key Segment Summary - DD-MMM-YYYY</Text>

      <View style={styles.row}>
        <WorkflowChartComponent title="Corporate to Retail Referrals (Date: from and to):" />
        <WorkflowChartComponent title="Retail to RC referrals (Date: from and to):" />
      </View>

      <View style={styles.row}>
        <ConversionRatesChart />
        <SegmentBreakdownChart />
      </View>

      <Text style={styles.footer}>Restricted-Internal</Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>

    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.header}>Cross Sell: CRM Referral Dashboard - Detailed Data Logs</Text>
      <LargeDataTableComponent />
      <Text style={styles.footer}>Restricted-Internal</Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);

// Main Export Component with CSS Spinner Loader
export const DownloadReportButton = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>CRM Referral Dashboard Report (with 1,000 Records)</h2>
      <PDFDownloadLink
        document={<DashboardPDF />}
        fileName="crm_referral_dashboard_1000_records.pdf"
        style={{
          textDecoration: 'none',
          padding: '12px 24px',
          color: '#ffffff',
          backgroundColor: '#1b365d',
          borderRadius: '6px',
          fontWeight: 'bold',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          minWidth: '260px'
        }}
      >
        {({ loading }) => (
          loading ? (
            <>
              {/* Inline Spinner CSS animation */}
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite'
              }} />
              <span>Generating PDF (1000 rows)...</span>
            </>
          ) : 'Download Large Dashboard PDF'
        )}
      </PDFDownloadLink>

      {/* Global CSS for the spinning keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};