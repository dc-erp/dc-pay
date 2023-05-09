import Grid from '@mui/material/Grid'
import ParameterDefinitionTabs from 'src/views/dc-pay/components/tabs/File/ParameterDefinitionTabs'


const ParameterDefinition = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <ParameterDefinitionTabs />
            </Grid>
        </Grid>
    )
}

export default ParameterDefinition
