// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'


// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import MenuRightsTable from 'src/views/dc-pay/tables/Settings/RightsManagement/MenuRightsTable'
import BranchRightsTable from 'src/views/dc-pay/tables/Settings/RightsManagement/BranchRightsTable'




const TabsNav = () => {
    // ** State
    const [value, setValue] = useState<string>('1')

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='nav tabs example'>
                <Tab
                    value='1'
                    component='a'
                    label='Branch'
                    href='/branch'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Menu'
                    href='/menu'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
            </TabList>
            <TabPanel value='1'>
                <BranchRightsTable />
            </TabPanel>
            <TabPanel value='2'>
                <MenuRightsTable />
            </TabPanel>

        </TabContext>
    )
}

export default TabsNav
