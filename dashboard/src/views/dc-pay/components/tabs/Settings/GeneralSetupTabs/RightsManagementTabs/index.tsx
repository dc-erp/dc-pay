// ** React Imports
import { MouseEvent, SyntheticEvent, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import MenuRightsTable from 'src/views/dc-pay/tables/Settings/RightsManagement/MenuRightsTable'
import BranchRightsTable from 'src/views/dc-pay/tables/Settings/RightsManagement/BranchRightsTable'


import { RootState } from 'src/store'


const TabsNav = () => {
    // ** State

    const [pageSize, setPageSize] = useState<number>(10)


    const [branchFormData, setBranchFormData] = useState({
        branch_code: '',
        branch_name: ''
    });

    const [departmentFormData, setDepartmentFormData] = useState({
        branch_id: '',
        department_code: '',
        department_name: ''
    });


    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const [value, setValue] = useState<string>('1')

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const store = useSelector((state: RootState) => state.menuLevelOne)


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
