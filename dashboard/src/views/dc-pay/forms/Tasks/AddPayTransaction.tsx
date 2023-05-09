// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'


import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import DateTimePicker from '@mui/lab/DateTimePicker'


import { Locale } from 'date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



import { RootState } from 'src/store'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addPayTransaction, editPayTransaction } from 'src/store/apps/Tasks/PayTransaction'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
    transactionAmount: yup.string()

})

const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
    transactionAmount: ''
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [menuLevelOne, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch])


    useEffect(() => {
        dispatch(
            fetchTransactionDefinition({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        reset(formData);
    }, [formData])



    const {
        control,
        setError,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editPayTransaction({ ...data }))
        } else {
            dispatch(addPayTransaction({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }


    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    return (
        <Card>
            <CardHeader title='Add Pay Transaction' titleTypographyProps={{ variant: 'h6' }} sx={{ mb: 4 }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='employeeId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Employee</InputLabel>
                                    <Select
                                        label='Employee'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        placeholder='Select Employee'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            employeeStore.data.map(({ id, firstName, lastName }) => {
                                                return (
                                                    <MenuItem value={id}>{`${firstName} ${lastName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </>

                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='transactionId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Transaction</InputLabel>
                                    <Select
                                        label='Transaction'
                                        placeholder='Select Transaction'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            transactionDefinitionStore.data.map(({ id, transactionName }) => {
                                                return (
                                                    <MenuItem value={id}>{`${transactionName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </>

                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='transactionAmount'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Transaction Amount'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.transactionAmount)}
                                    placeholder='Enter Transaction Amount'
                                />
                            )}
                        />
                        {errors.transactionAmount && <FormHelperText sx={{ color: 'error.main' }}>{errors.transactionAmount.message}</FormHelperText>}
                    </FormControl>
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button color='secondary' fullWidth size='large' onClick={() => reset()} type='reset' variant='contained' sx={{ mb: 7 }}>
                                    Reset
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>


                </form>

            </CardContent>
        </Card >
    )
}

export default AddMenuLevelTwo
