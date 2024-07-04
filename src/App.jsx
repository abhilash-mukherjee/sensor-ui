import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import TopBar from './components/TopBar';
import './App.css';
import BodyContainer from './components/BodyContainer';
import { RecoilRoot } from 'recoil';

function App() {
  return (
<RecoilRoot>
<ChakraProvider>
      <Box minH="100vh" w="100%">
        <TopBar />
        {/* Additional content can be added here */}
        <BodyContainer />
      </Box>
    </ChakraProvider>
</RecoilRoot>
  );
}

export default App;
