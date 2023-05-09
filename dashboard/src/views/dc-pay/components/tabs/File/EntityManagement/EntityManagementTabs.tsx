import { MouseEvent, SyntheticEvent, useState } from 'react'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import BranchTable from 'src/views/dc-pay/tables/File/EntityManagement/BranchTable'
import DepartmentTable from 'src/views/dc-pay/tables/File/EntityManagement/DepartmentTable'

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
                    label='Branch'
                    href='/branch'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Department'
                    href='/departments'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
              
            </TabList>
            <TabPanel value='1'>
                <BranchTable />
            </TabPanel>
            <TabPanel value='2'>
                <DepartmentTable />
            </TabPanel>
        </TabContext>
    )
}

export default TabsNav
