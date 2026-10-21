import React, { useEffect, useRef } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import Highcharts from 'highcharts';

const categories = [
  'Referrals',
  'Rejected',
  'Accepted',
  'In progress',
  'Overdue',
  'Successful',
];

const referralMetrics = [
  { y: 200, color: '#1B365D' },
  { y: 15, color: '#D9534F' },
  { y: 185, color: '#888888' },
  { y: 45, color: '#337AB7' },
  { y: 20, color: '#D9534F' },
  { y: 120, color: '#5CB85C' },
];

const corporateToRetailOptions = {
  chart: { type: 'column', height: 280, backgroundColor: 'transparent' },
  title: {
    text: 'Corporate to Retail Referrals (Date: from and to):-YYYY',
    style: { fontSize: '13px' },
  },
  xAxis: { categories },
  yAxis: { title: { text: '' } },
  series: [{ name: 'Metrics', data: referralMetrics, showInLegend: false }],
  credits: { enabled: false },
};

const retailToRCOptions = {
  chart: { type: 'column', height: 280, backgroundColor: 'transparent' },
  title: {
    text: 'Retail to RC referrals (Date from and to):',
    style: { fontSize: '13px' },
  },
  xAxis: { categories },
  yAxis: { title: { text: '' } },
  series: [{ name: 'Metrics', data: referralMetrics, showInLegend: false }],
  credits: { enabled: false },
};

const conversionRatesOptions = {
  chart: { type: 'bar', height: 350, backgroundColor: 'transparent' },
  title: {
    text: 'Conversion rates by Referrer:',
    style: { fontSize: '13px' },
  },
  xAxis: {
    categories: [
      'LC to EBS',
      'Inst to EBS',
      'MSME to EBS',
      'LC to Affluent',
      'Inst to Affluent',
      'MSME to Affluent',
      'LC to Private',
      'Inst to Private',
      'ME to Private',
      'Affluent to RC',
      'Private to RC',
    ],
  },
  yAxis: { title: { text: '' }, max: 100 },
  series: [{
    name: 'Conversion Rate %',
    data: [50.0, 57.0, 65.0, 30.0, 70.0, 25.0, 66.0, 82.0, 19.0, 70.0, 65.0],
    color: '#5CB85C',
    showInLegend: false,
  }],
  credits: { enabled: false },
};

const businessSegmentsOptions = {
  chart: { type: 'bar', height: 350, backgroundColor: 'transparent' },
  title: {
    text: 'Referrals in progress and overdue by business segments',
    style: { fontSize: '13px' },
  },
  xAxis: {
    categories: [
      'Employee Banking',
      'Affluent banking',
      'Private Banking',
      'Large Corporate',
      'Institutional Banking',
      'MSME',
      'Riyad Capital',
    ],
  },
  yAxis: { title: { text: '' } },
  series: [
    { name: 'In progress', data: [15, 22, 35, 11, 19, 8, 12], color: '#337AB7' },
    { name: 'Overdue', data: [5, 4, 7, 3, 10, 5, 7], color: '#D9534F' },
  ],
  credits: { enabled: false },
};

const chartDefinitions = [
  { options: corporateToRetailOptions, key: 'corporate-to-retail' },
  { options: retailToRCOptions, key: 'retail-to-rc' },
  { options: conversionRatesOptions, key: 'conversion-rates' },
  { options: businessSegmentsOptions, key: 'business-segments' },
];

const HighchartsChart = React.memo(({ options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const chart = Highcharts.chart(chartRef.current, {
      ...options,
      chart: { ...options.chart, reflow: true, width: null },
    });

    return () => chart.destroy();
  }, [options]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
});

export const DashboardCharts = () => (
  <>
    {chartDefinitions.map(({ key, options }) => (
      <Grid key={key} size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
        <Card
          sx={{
            width: '100%',
            boxShadow: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
            <HighchartsChart options={options} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </>
);
