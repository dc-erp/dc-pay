// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'


import UsersTable from 'src/views/dc-pay/tables/Settings/UserManagement/UsersTable'
import RolesTable from 'src/views/dc-pay/tables/Settings/UserManagement/RolesTable'




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
                    label='Users'
                    href='/users'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Roles'
                    href='/roles'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
            </TabList>
            <TabPanel value='1'>
                <UsersTable />
            </TabPanel>
            <TabPanel value='2'>
                <RolesTable />
            </TabPanel>

        </TabContext>
    )
}

export default TabsNav
