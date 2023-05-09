import Grid from '@mui/material/Grid'
import RightsManagementTabs from 'src/views/dc-pay/components/tabs/Settings/RightsManagementTabs'

const RightsManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <RightsManagementTabs />
            </Grid>
        </Grid>
    )
}

export default RightsManagement