import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import TopBar from './components/TopBar';
import './App.css';
import BodyContainer from './components/BodyContainer';
import { RecoilRoot } from 'recoil';
import InitComponent from './components/InitComponent';

function App() {
  return (
<RecoilRoot>
<ChakraProvider>
      <Box minH="100vh" w="100%">
        <TopBar />
        <InitComponent />
        <BodyContainer />
      </Box>
    </ChakraProvider>
</RecoilRoot>
  );
}

export default App;
