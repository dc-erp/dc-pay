// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'


// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import MainParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/MainParameterDefinitionTable'
import SubParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/SubParameterDefinitionTable'


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
                    label='Main'
                    href='/branch'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Sub'
                    href='/departments'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
            </TabList>
            <TabPanel value='1'>
                <MainParameterDefinitionTable />
            </TabPanel>
            <TabPanel value='2'>
                <SubParameterDefinitionTable />
            </TabPanel>
        </TabContext>
    )
}

export default TabsNav
