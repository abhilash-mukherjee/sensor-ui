import React, { useState } from 'react';
import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeImmovableSpacePathState, getImmovableSpaceName } from '../store/activeImmovableSpaceAtom';
import { LocationDrawerContent } from './drawer_components/LocationDrawerContent';

const baseUrl = import.meta.env.VITE_BASE_URL;
const authToken = import.meta.env.VITE_AUTH_TOKEN;
const immovableSpace1 = import.meta.env.VITE_IMMOVABLE_SPACE_1;
const immovableSpace2 = import.meta.env.VITE_IMMOVABLE_SPACE_2;

export function ImmovableSpaceInfoDrawer() {
    const [activeImmovableSpacePath, setActiveImmovableSpacePath] = useRecoilState(activeImmovableSpacePathState);
    const activeImmovableSpaceName = useRecoilValue(getImmovableSpaceName);
    const isOpen = activeImmovableSpacePath != null;
    const onClose = () => setActiveImmovableSpacePath(null);
    const [buttonText, setButtonText] = useState('Calibrate');
    const [isCalibrating, setIsCalibrating] = useState(false);

    const onCalibrate = async () => {
        setButtonText('Calibrating...');
        setIsCalibrating(true);
        try {
            const response = await axios.post(`${baseUrl}/calibrate/${activeImmovableSpaceName}`, {}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            alert(`Response: ${response.data.message}`);
        } catch (error) {
            alert(`Error: ${error.response ? error.response.data.message : 'No response from server'}`);
        } finally {
            setButtonText('Calibrate');
            setIsCalibrating(false);
        }
    };

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={'md'}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Level Details</DrawerHeader>
                <DrawerBody>
                    <LocationDrawerContent activeImmovableSpacePath={activeImmovableSpacePath} />
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>Close</Button>
                    <Button colorScheme='blue' onClick={onCalibrate} disabled={isCalibrating}>{buttonText}</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
