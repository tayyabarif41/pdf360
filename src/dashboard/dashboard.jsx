import { useMemo, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { DashboardCharts } from './DashboardCharts';
import { DashboardPDF } from './DashboardPDF';
import { ReferralsTable } from './ReferralsTable';
import { createDummyRecords } from './referralData';

export const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const records = useMemo(() => createDummyRecords(), []);

  const handleGenerateAndDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const blob = await pdf(<DashboardPDF records={records} />).toBlob();
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

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1B365D',
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
          }}
        >
          Cross-Sell: CRM Referral Dashboard - Key Segment Summary
        </Typography>

        <Button
          variant="contained"
          startIcon={
            isGenerating ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DownloadIcon />
            )
          }
          onClick={handleGenerateAndDownloadPDF}
          disabled={isGenerating}
          sx={{
            backgroundColor: '#1B365D',
            '&:hover': { backgroundColor: '#122340' },
            whiteSpace: 'nowrap',
            px: 3,
            py: 1,
          }}
        >
          {isGenerating ? 'Building PDF Report...' : 'Export to PDF'}
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <DashboardCharts />
        <Grid size={{ xs: 12 }}>
          <ReferralsTable records={records} />
        </Grid>
      </Grid>
    </Box>
  );
};
