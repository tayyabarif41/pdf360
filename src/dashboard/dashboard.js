import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Highcharts from 'highcharts';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Svg, 
  Rect, 
  pdf 
} from '@react-pdf/renderer';

// --- HIGHCHARTS BROWSER WRAPPER ---
const HighchartsChart = React.memo(({ options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = Highcharts.chart(chartRef.current, {
      ...options,
      chart: { ...options.chart, reflow: true, width: null }
    });

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
});

// --- REACT-PDF STYLES & CHART SVG TEMPLATES ---
const pdfStyles = StyleSheet.create({
  page: { padding: 24, fontSize: 9, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#cbd5e0' },
  headerTitle: { fontSize: 13, color: '#1B365D', fontWeight: 'bold' },
  headerDate: { fontSize: 8, color: '#64748b' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  card: { width: '49%', backgroundColor: '#ffffff', borderRadius: 4, padding: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 9, fontWeight: 'bold', color: '#1B365D', marginBottom: 6 },
  tableSection: { marginTop: 6, backgroundColor: '#ffffff', borderRadius: 4, padding: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  table: { display: 'flex', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0' },
  tableRow: { flexDirection: 'row' },
  tableColHeader: { backgroundColor: '#1B365D', color: '#ffffff', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbd5e0', padding: 5, fontWeight: 'bold', fontSize: 7.5, textAlign: 'center' },
  tableCol: { borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#e2e8f0', padding: 4, fontSize: 7, textAlign: 'center', color: '#334155' },
  pageNumber: { position: 'absolute', bottom: 10, right: 24, fontSize: 8, color: '#64748b' },
  footer: { position: 'absolute', bottom: 10, left: 24, fontSize: 8, color: '#94a3b8', fontWeight: 'bold' }
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
              <Text x={x + 5} y={y - 4} fontSize="6.5" fill={item.color} fontWeight="bold">{item.val}</Text>
              <Rect x={x} y={y} width="28" height={barHeight} fill={item.color} rx="1" />
              <Text x={x - 2} y="92" fontSize="5.5" fill="#475569">{item.label}</Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const PDFConversionRatesChart = () => {
  const data = [
    { label: 'LC to EBS', val: 50.0 }, { label: 'Inst to EBS', val: 57.0 }, { label: 'MSME to EBS', val: 65.0 },
    { label: 'LC to Affluent', val: 30.0 }, { label: 'Inst to Affluent', val: 70.0 }, { label: 'MSME to Affluent', val: 25.0 },
    { label: 'LC to Private', val: 66.0 }, { label: 'Inst to Private', val: 82.0 }, { label: 'ME to Private', val: 19.0 },
    { label: 'Affluent to RC', val: 70.0 }, { label: 'Private Bank to RC', val: 65.0 },
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
              <Text x="0" y={y + 7} fontSize="6" fill="#334155">{item.label}</Text>
              <Rect x="85" y={y} width={barWidth} height="8" fill="#5CB85C" rx="1" />
              <Text x={90 + barWidth} y={y + 7} fontSize="6" fill="#0f172a" fontWeight="bold">{item.val.toFixed(1)}%</Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const PDFBusinessSegmentsChart = () => {
  const data = [
    { label: 'Employee Banking', inProg: 15, overdue: 5 }, { label: 'Affluent banking', inProg: 22, overdue: 4 },
    { label: 'Private Banking', inProg: 35, overdue: 7 }, { label: 'Large Corporate', inProg: 11, overdue: 3 },
    { label: 'Institutional Banking', inProg: 19, overdue: 10 }, { label: 'MSME', inProg: 8, overdue: 5 }, { label: 'Riyad Capital', inProg: 12, overdue: 7 },
  ];

  return (
    <View style={pdfStyles.card}>
      <Text style={pdfStyles.cardTitle}>Referrals in progress and overdue by business segments</Text>
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
          <View style={{ width: 6, height: 6, backgroundColor: '#337AB7', marginRight: 3 }} />
          <Text style={{ fontSize: 6, color: '#475569' }}>In progress</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 6, height: 6, backgroundColor: '#D9534F', marginRight: 3 }} />
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
              <Text x="0" y={y + 7} fontSize="6" fill="#334155">{item.label}</Text>
              <Rect x="85" y={y} width={progWidth} height="8" fill="#337AB7" rx="1" />
              <Text x="88" y={y + 6} fontSize="5" fill="#ffffff" fontWeight="bold">{item.inProg}</Text>
              <Rect x={85 + progWidth} y={y} width={overdueWidth} height="8" fill="#D9534F" rx="1" />
              <Text x={88 + progWidth} y={y + 6} fontSize="5" fill="#ffffff" fontWeight="bold">{item.overdue}</Text>
              <Text x={92 + progWidth + overdueWidth} y={y + 6} fontSize="6" fill="#0f172a" fontWeight="bold">{total}</Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const DashboardPDF = ({ dummyRecords }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <View style={pdfStyles.headerRow}>
          <Text style={pdfStyles.headerTitle}>Cross-Sell: CRM Referral Dashboard - Key Segment Summary</Text>
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
        <Text style={pdfStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
      </Page>

      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <View style={pdfStyles.headerRow}>
          <Text style={pdfStyles.headerTitle}>Cross-Sell: CRM Referral Dashboard - Audit Trail Records</Text>
          <Text style={pdfStyles.headerDate}>Date: {currentDate}</Text>
        </View>
        <View style={pdfStyles.tableSection}>
          <Text style={pdfStyles.cardTitle}>Complete Referrals Data Table Records (1,000 Entries)</Text>
          <View style={pdfStyles.table}>
            <View style={[pdfStyles.tableRow, { backgroundColor: '#1B365D' }]} fixed>
              <Text style={[pdfStyles.tableColHeader, { width: '8%' }]}>ID</Text>
              <Text style={[pdfStyles.tableColHeader, { width: '22%' }]}>Customer Name</Text>
              <Text style={[pdfStyles.tableColHeader, { width: '25%' }]}>Email</Text>
              <Text style={[pdfStyles.tableColHeader, { width: '20%' }]}>Business Segment</Text>
              <Text style={[pdfStyles.tableColHeader, { width: '13%' }]}>Status</Text>
              <Text style={[pdfStyles.tableColHeader, { width: '12%', borderRightWidth: 0 }]}>Amount</Text>
            </View>
            {dummyRecords.map((row, index) => (
              <View style={pdfStyles.tableRow} key={index} wrap={false}>
                <Text style={[pdfStyles.tableCol, { width: '8%' }]}>{row.id}</Text>
                <Text style={[pdfStyles.tableCol, { width: '22%', textAlign: 'left', paddingLeft: 4 }]}>{row.name}</Text>
                <Text style={[pdfStyles.tableCol, { width: '25%', textAlign: 'left', paddingLeft: 4 }]}>{row.email}</Text>
                <Text style={[pdfStyles.tableCol, { width: '20%', textAlign: 'left', paddingLeft: 4 }]}>{row.segment}</Text>
                <Text style={[pdfStyles.tableCol, { width: '13%' }]}>{row.status}</Text>
                <Text style={[pdfStyles.tableCol, { width: '12%', borderRightWidth: 0 }]}>{row.amount}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={pdfStyles.footer}>Restricted - Internal Use Only</Text>
        <Text style={pdfStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

// --- MAIN RESPONSIVE DASHBOARD COMPONENT ---
export const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Pagination State for UI Data Table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dummyRecords = useMemo(() => {
    const segments = ['Employee Banking', 'Affluent Banking', 'Private Banking', 'Large Corporate', 'Institutional Banking', 'MSME', 'Riyad Capital'];
    const statuses = ['Completed', 'Pending', 'Failed', 'In Progress'];
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Green', 'David Miller', 'Emma Wilson'];

    return Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `${names[i % names.length]} ${i + 1}`,
      email: `user${i + 1}@example.com`,
      segment: segments[i % segments.length],
      status: statuses[i % statuses.length],
      amount: `$${((i * 47) % 900) + 100}`,
    }));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGenerateAndDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const blob = await pdf(<DashboardPDF dummyRecords={dummyRecords} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Cross-Sell-CRM-Referral-Dashboard.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const corporateToRetailOptions = useMemo(() => ({
    chart: { type: 'column', height: 280, backgroundColor: 'transparent' },
    title: { text: 'Corporate to Retail Referrals (Date: from and to):-YYYY', style: { fontSize: '13px' } },
    xAxis: { categories: ['Referrals', 'Rejected', 'Accepted', 'In progress', 'Overdue', 'Successful'] },
    yAxis: { title: { text: '' } },
    series: [{
      name: 'Metrics',
      data: [
        { y: 200, color: '#1B365D' },
        { y: 15, color: '#D9534F' },
        { y: 185, color: '#888888' },
        { y: 45, color: '#337AB7' },
        { y: 20, color: '#D9534F' },
        { y: 120, color: '#5CB85C' }
      ],
      showInLegend: false
    }],
    credits: { enabled: false },
  }), []);

  const retailToRCOptions = useMemo(() => ({
    chart: { type: 'column', height: 280, backgroundColor: 'transparent' },
    title: { text: 'Retail to RC referrals (Date from and to):', style: { fontSize: '13px' } },
    xAxis: { categories: ['Referrals', 'Rejected', 'Accepted', 'In progress', 'Overdue', 'Successful'] },
    yAxis: { title: { text: '' } },
    series: [{
      name: 'Metrics',
      data: [
        { y: 200, color: '#1B365D' },
        { y: 15, color: '#D9534F' },
        { y: 185, color: '#888888' },
        { y: 45, color: '#337AB7' },
        { y: 20, color: '#D9534F' },
        { y: 120, color: '#5CB85C' }
      ],
      showInLegend: false
    }],
    credits: { enabled: false },
  }), []);

  const conversionRatesOptions = useMemo(() => ({
    chart: { type: 'bar', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Conversion rates by Referrer:', style: { fontSize: '13px' } },
    xAxis: {
      categories: [
        'LC to EBS', 'Inst to EBS', 'MSME to EBS', 
        'LC to Affluent', 'Inst to Affluent', 'MSME to Affluent', 
        'LC to Private', 'Inst to Private', 'ME to Private', 
        'Affluent to RC', 'Private to RC'
      ]
    },
    yAxis: { title: { text: '' }, max: 100 },
    series: [{
      name: 'Conversion Rate %',
      data: [50.0, 57.0, 65.0, 30.0, 70.0, 25.0, 66.0, 82.0, 19.0, 70.0, 65.0],
      color: '#5CB85C',
      showInLegend: false
    }],
    credits: { enabled: false },
  }), []);

  const businessSegmentsOptions = useMemo(() => ({
    chart: { type: 'bar', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Referrals in progress and overdue by business segments', style: { fontSize: '13px' } },
    xAxis: {
      categories: ['Employee Banking', 'Affluent banking', 'Private Banking', 'Large Corporate', 'Institutional Banking', 'MSME', 'Riyad Capital']
    },
    yAxis: { title: { text: '' } },
    series: [
      { name: 'In progress', data: [15, 22, 35, 11, 19, 8, 12], color: '#337AB7' },
      { name: 'Overdue', data: [5, 4, 7, 3, 10, 5, 7], color: '#D9534F' }
    ],
    credits: { enabled: false },
  }), []);

  // Compute sliced rows for pagination
  const paginatedRows = useMemo(() => {
    return dummyRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [dummyRecords, page, rowsPerPage]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Header Bar */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1B365D', fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
          Cross-Sell: CRM Referral Dashboard - Key Segment Summary
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={isGenerating ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon />} 
          onClick={handleGenerateAndDownloadPDF}
          disabled={isGenerating}
          sx={{ backgroundColor: '#1B365D', '&:hover': { backgroundColor: '#122340' }, whiteSpace: 'nowrap', px: 3, py: 1 }}
        >
          {isGenerating ? 'Building PDF Report...' : 'Export to PDF'}
        </Button>
      </Box>

      {/* Grid Layout using modern size prop */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        
        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
              <HighchartsChart options={corporateToRetailOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
              <HighchartsChart options={retailToRCOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
              <HighchartsChart options={conversionRatesOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
              <HighchartsChart options={businessSegmentsOptions} />
            </CardContent>
          </Card>
        </Grid>

        {/* Data Table with MUI Pagination using size={12} */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1B365D', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Referrals Data Table ({dummyRecords.length.toLocaleString()} Total Records)
              </Typography>
              
              <TableContainer component={Paper} sx={{ maxHeight: 450, width: '100%', overflowX: 'auto' }}>
                <Table stickyHeader aria-label="referrals data table" size="medium" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>Customer Name</TableCell>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>Business Segment</TableCell>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRows.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1B365D' }}>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.segment}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Table Pagination Component */}
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={dummyRecords.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};