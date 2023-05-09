
import Grid from '@mui/material/Grid'
import EntityManagementTabs from 'src/views/dc-pay/components/tabs/File/EntityManagement/EntityManagementTabs'

const EntityManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <EntityManagementTabs />
            </Grid>
        </Grid>
    )
}

export default EntityManagement
