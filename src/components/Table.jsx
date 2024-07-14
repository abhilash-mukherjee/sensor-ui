import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Badge
} from '@chakra-ui/react';
import { FreshnessStatus } from '../enums/FreshnessStatus';

const InventoryTable = () => {
  const data = [
    { id: 'Bn1', description: 'Banana1', zone: 'Perishable', location: 'B3', hu: 'HU123', vendor: 'HV01', batchId: 'HV012', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Premature, inboundDate: '4/29/2024' },
    { id: 'Bn2', description: 'Banana12', zone: 'Perishable', location: 'C1', hu: 'HU246', vendor: 'HV02', batchId: 'HV01', locked: 'No', qty: '150', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Rotten, inboundDate: '4/29/2024' },
    { id: 'Ap f2', description: 'Apple 2', zone: 'Perishable', location: 'A2', hu: 'HU498', vendor: 'HV03', batchId: 'HV02', locked: 'No', qty: '150', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Edible, inboundDate: '1/20/2024' },
    { id: 'BT_904', description: 'Guava22', zone: 'Perishable', location: 'C7', hu: 'HU428', vendor: 'HV04', batchId: 'BTH1', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Edible, inboundDate: '1/29/2024' },
    { id: 'BT_904', description: 'Oranges 96', zone: 'Perishable', location: 'B6', hu: 'HU918', vendor: 'HV05', batchId: 'BTH2', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Edible, inboundDate: '1/29/2024' },
    { id: 'BT_904', description: 'Dragon fruit 45', zone: 'Perishable', location: 'A6', hu: 'HU411', vendor: 'HV02', batchId: 'BTH3', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Edible, inboundDate: '1/29/2024' },
    { id: 'BT_904', description: 'Dragon fruit 45', zone: 'Perishable', location: 'A6', hu: 'HU411', vendor: 'HV02', batchId: 'BTH3', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Premature, inboundDate: '1/29/2024' },
    { id: 'BT_904', description: 'Dragon fruit 45', zone: 'Perishable', location: 'A6', hu: 'HU411', vendor: 'HV02', batchId: 'BTH3', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Rotten, inboundDate: '1/29/2024' },
    { id: 'BT_904', description: 'Dragon fruit 45', zone: 'Perishable', location: 'A6', hu: 'HU411', vendor: 'HV02', batchId: 'BTH3', locked: 'No', qty: '200', toBePicked: '200', uom: 'Eaches', state: FreshnessStatus.Premature, inboundDate: '1/29/2024' }
  ];

  const stateColors = {
    Raw: 'green',
    Ripe: 'yellow',
    Rotten: 'red'
  };

  return (
    <Box overflowX="auto" bg={'white'}
    borderRadius={'8px'}
    borderWidth={'2px'}
    borderColor={'gray.100'}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Seller SKU</Th>
            <Th>Item Description</Th>
            <Th>Zone</Th>
            <Th>Location</Th>
            <Th>HU</Th>
            <Th>Vendor</Th>
            <Th>Batch Id</Th>
            <Th>Is Locked</Th>
            <Th>Total Qty</Th>
            <Th>To Be Picked</Th>
            <Th>UOM</Th>
            <Th>State</Th>
            <Th>Inbound Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr
              key={index}
              bg={index % 2 === 0 ? 'gray.100' : 'gray.150'}
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              <Td>{item.id}</Td>
              <Td>{item.description}</Td>
              <Td>{item.zone}</Td>
              <Td>{item.location}</Td>
              <Td>{item.hu}</Td>
              <Td>{item.vendor}</Td>
              <Td>{item.batchId}</Td>
              <Td>{item.locked}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.toBePicked}</Td>
              <Td>{item.uom}</Td>
              <Td>
                <Badge colorScheme={item.state.standardColor || 'grey'}>
                  {item.state.description}
                </Badge>
              </Td>
              <Td>{item.inboundDate}</Td>
              <Td>
                <Button size="sm">View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryTable;
