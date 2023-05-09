// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import MenuSetupTabs from 'src/views/dc-pay/components/tabs/Settings/GeneralSetupTabs/MenuSetupTabs'
import HolidayTable from 'src/views/dc-pay/tables/Settings/GeneralSetup/HolidayTable'

const GeneralSetupTabs = () => {
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
                    label='Company'
                    href='/company'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Menu'
                    href='/menu'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='3'
                    component='a'
                    label='Holiday'
                    href='/holiday'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
            </TabList>
            <TabPanel value='1'>
            </TabPanel>
            <TabPanel value='2'>
                <MenuSetupTabs />
            </TabPanel>
            <TabPanel value='3'>
                <HolidayTable />
            </TabPanel>

        </TabContext>
    )
}

export default GeneralSetupTabs
