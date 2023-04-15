import Grid from '@mui/material/Grid'
import UserManagementTabs from 'src/views/dc-pay/components/tabs/Settings/UserManagementTabs'


const UserManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <UserManagementTabs />
            </Grid>
        </Grid>
    )
}

export default UserManagement
