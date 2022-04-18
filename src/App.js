//import logo from './logo.svg';
import AddingForm from './AddingForm'
import UserView from './UsersView'
import React from 'react'
import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from '@mui/lab'

function App() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <div className="App">

        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Add user" value="1" />
                    <Tab label="View users" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><AddingForm/></TabPanel>
            <TabPanel value="2"><UserView/></TabPanel>
        </TabContext>

    </div>
  );
}

export default App;
