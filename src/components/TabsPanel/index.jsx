import React from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabsPanel = ({ tabStatus, setTabStatus }) => {
  const handleChange = (event, newValue) => {
    setTabStatus(newValue);
  };

  return (
    <nav role="navigation">
      <Paper square>
        <Tabs
          value={tabStatus}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          <Tab label="Dough" />
          <Tab label="Discard" />
        </Tabs>
      </Paper>
    </nav>
  );
};

export default TabsPanel;
