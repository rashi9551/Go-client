import { useState } from "react";
import { AdminNavbar } from "../../../components/admin/AdminNavbar";
import VerifiedDriverDetails from "../../../components/admin/Driver/VerifiedDriverDetails";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";

const AdminDriverDetailsVerified = () => {

    const [tab, settab] = useState(1);

    return (
        <>
            <AdminNavbar />
            <div className="admin-container rounded-3xl bg-gray-100 drop-shadow-xl md:mx-[8rem] mt-[2.5rem] pt-1">
                <Tabs position="relative" variant="unstyled">
                    <div className="md:ml-5">
                        <TabList>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(1)}>
                                <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Driver Info</h1>
                            </Tab>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(2)}>
                                <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Feedbacks</h1>
                            </Tab>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(3)}>
                                <h1 className={tab === 3 ? "font-bold " : "font-normal"}>Rides</h1>
                            </Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <VerifiedDriverDetails />
                        </TabPanel>
                        {/* <TabPanel>
                            <VerifiedFeedbacks />
                        </TabPanel> */}
                        {/* <TabPanel>
                            <VerifiedRides />
                        </TabPanel> */}
                    </TabPanels>
                </Tabs>
            </div>
        </>
    );
};

export default AdminDriverDetailsVerified;