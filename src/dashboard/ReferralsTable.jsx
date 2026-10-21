import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

const headerCellSx = {
  backgroundColor: '#1B365D',
  color: '#ffffff',
  fontWeight: 'bold',
};

export const ReferralsTable = ({ records }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedRows = useMemo(
    () => records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [records, page, rowsPerPage]
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#1B365D',
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Referrals Data Table ({records.length.toLocaleString()} Total Records)
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ maxHeight: 450, width: '100%', overflowX: 'auto' }}
        >
          <Table
            stickyHeader
            aria-label="referrals data table"
            size="medium"
            sx={{ minWidth: 650 }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellSx}>ID</TableCell>
                <TableCell sx={headerCellSx}>Customer Name</TableCell>
                <TableCell sx={headerCellSx}>Email</TableCell>
                <TableCell sx={headerCellSx}>Business Segment</TableCell>
                <TableCell sx={headerCellSx}>Status</TableCell>
                <TableCell sx={headerCellSx}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B365D' }}>
                    {row.id}
                  </TableCell>
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

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};
