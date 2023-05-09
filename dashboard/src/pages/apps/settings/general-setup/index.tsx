// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import GeneralSetupTabs from 'src/views/dc-pay/components/tabs/Settings/GeneralSetupTabs'

const GeneralSetup = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <GeneralSetupTabs />
            </Grid>
        </Grid>
    )
}

export default GeneralSetup
