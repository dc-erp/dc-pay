// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import MenuLevelOneTable from 'src/views/dc-pay/tables/Settings/GeneralSetup/MenuSetup/MenuLevelOneTable'
import MenuLevelTwoTable from 'src/views/dc-pay/tables/Settings/GeneralSetup/MenuSetup/MenuLevelTwoTable'


const TabsNav = () => {
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
                    label='Level 1'
                    href='/menu-level-one'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Level 2'
                    href='/menu-level-two'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
            </TabList>
            <TabPanel value='1'>
                <MenuLevelOneTable />
            </TabPanel>
            <TabPanel value='2'>
                <MenuLevelTwoTable />
            </TabPanel>

        </TabContext>
    )
}

export default TabsNav
