import Navbar from '../../../components/user/Home/NavBar'
import Footer from '../../../components/user/Home/Footer'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { useState } from 'react';
import UserCurrentRide from '../../../components/user/Home/UserCurrentRide';
import UserRideHistory from '../../../components/user/Home/UserRideHistory';


const UserCurrentRidePage = () => {

    const [tab, settab] = useState(1);

    return (
        <>
            <Navbar />
            <div className='rounded-3xl bg-gray-100 drop-shadow-xl md:w-[91%] mx-auto mt-5 pt-7 pb-4 mb-8'>
                <div className='md:ml-5'>
                    <Tabs position="relative" variant="unstyled">
                        <div className="md:ml-5">
                            <TabList>
                                <Tab sx={{ fontSize: "24px" }} onClick={() => settab(1)}>
                                    <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Current Ride</h1>
                                </Tab>
                                <Tab sx={{ fontSize: "24px" }} onClick={() => settab(2)}>
                                    <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Rides History</h1>
                                </Tab>
                            </TabList>
                            <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                        </div>
                        <TabPanels>
                            <TabPanel>
                               <UserCurrentRide/>
                            </TabPanel>
                            <TabPanel>
                            <UserRideHistory/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserCurrentRidePage