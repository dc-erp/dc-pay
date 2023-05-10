// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


import FormHelperText from '@mui/material/FormHelperText'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'






// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addTaxRate, editTaxRate } from 'src/store/apps/Utilities/TaxRate'

// ** Types Imports
import { AppDispatch } from 'src/store'



const schema = yup.object().shape({
    id: yup.string(),
    taxRateCode: yup.string(),
    highestRange: yup.string(),
    lowestRange: yup.string(),
    taxRate: yup.string(),

})

const emptyValues = {
    id: '',
    taxRateCode: '',
    highestRange: '',
    lowestRange: '',
    taxRate: ''
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [, setMainParameterDefinition] = useState<string>('')





    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])


    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editTaxRate({ ...data }))
        } else {
            dispatch(addTaxRate({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }



    return (
        <Card>
            <CardHeader title='Add Tax Rate' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='taxRateCode'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Tax Rate Code'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.taxRateCode)}
                                    placeholder='Enter Tax Rate Code'
                                />
                            )}
                        />
                        {errors.taxRateCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.taxRateCode.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='lowestRange'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Lower Range'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.lowestRange)}
                                    placeholder='Enter Lower Range'
                                />
                            )}
                        />
                        {errors.lowestRange && <FormHelperText sx={{ color: 'error.main' }}>{errors.lowestRange.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='highestRange'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Highest Range'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.highestRange)}
                                    placeholder='Enter Highest Range'
                                />
                            )}
                        />
                        {errors.highestRange && <FormHelperText sx={{ color: 'error.main' }}>{errors.highestRange.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='taxRate'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Tax Rate'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.taxRate)}
                                    placeholder='Enter Tax Rate'
                                />
                            )}
                        />
                        {errors.taxRate && <FormHelperText sx={{ color: 'error.main' }}>{errors.taxRate.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth>
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                            Submit
                        </Button>
                    </FormControl>

                    <FormControl fullWidth>
                        <Button fullWidth size='large' onClick={() => reset()} type='reset' variant='contained' sx={{ mb: 7 }}>
                            Reset
                        </Button>
                    </FormControl>

                </form>

            </CardContent>
        </Card >
    )
}

export default AddMenuLevelTwo
