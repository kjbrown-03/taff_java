import { Box, Typography } from '@mui/material';

const TestDashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: 'red', color: 'white' }}>
      <Typography variant="h4">TEST DASHBOARD - Si tu vois ça, le problème vient des autres dashboards</Typography>
    </Box>
  );
};

export default TestDashboard;
