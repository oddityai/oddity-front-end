import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Buttons from "./Buttons"
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ handleClick, answers, profileData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Chatbots" {...a11yProps(0)} />
          <Tab label="Chat History" {...a11yProps(1)} />
          {/* <Tab label="Oddity Feed" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
        <h2 className={nunito.className} style={{ fontSize: 22 }}>
            Use AI to get straight A's in class
          </h2>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>
          <Buttons handleClick={handleClick} />

          </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
        <h2 className={nunito.className} style={{ fontSize: 22 }}>
            Oddity Chat History
          </h2>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Here you can see a history of all your chats with our AI Bots.
          </h3>
            {
               profileData?.chatHistory?.map((answer) => {
                return <>
                <div style={{border: '1px solid silver', margin: 8}}>
                <div style={{padding: 8}}>
                <div>Question: {answer.input}</div><br />
                    <div>Answer: {answer.result}</div>
                </div>

                </div>
                <br />
                <br />
                </>
               })
            }
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
        <h2 className={nunito.className} style={{ fontSize: 22 }}>
            Leave a comment for the whole world to see!
          </h2>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            This feed is plugged in to users all over the world.
          </h3>
        </>
      </TabPanel>
    </Box>
  );
}