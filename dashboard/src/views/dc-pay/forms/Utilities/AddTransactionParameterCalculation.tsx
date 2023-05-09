
// ** React Imports
import {  useState,  useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'


import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'



// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



import { RootState } from 'src/store'


import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addTransactionParameterCalculation, editTransactionParameterCalculation } from 'src/store/apps/Utilities/TransactionParameterCalculation'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'


const schema = yup.object().shape({
    firstTransaction: yup.string(),
    secondTransaction: yup.string(),
    thirdTransaction: yup.string(),
    calculationUnit: yup.string(),
    firstOption: yup.string(),
    secondOption: yup.string(),
    rate: yup.string(),

})

const emptyValues = {
    id: '',
    firstTransaction: '',
    secondTransaction: '',
    thirdTransaction: '',
    calculationUnit: '',
    firstOption: '',
    secondOption: '',
    rate: ''
}


const AddTransactionParameterCalculation = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchMainParameterDefinitions({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        dispatch(
            fetchSubParameterDefinition({
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
            dispatch(editTransactionParameterCalculation({ ...data }))
        } else {
            dispatch(addTransactionParameterCalculation({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }

    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)
    
    
    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)
    
    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);
        
return filteredChild
    }

    const calculationUnitOptions = filterSubParametersByName('Calculation Unit')
    const transactionCalculationOptions = filterSubParametersByName('Transaction Calculation')
    
    const inputTransactionDefs = transactionDefinitionStore.data.filter((tran: any) => tran.updateTypeName === 'Input')





    return (
        <Card>
            <CardHeader title='Add Transaction Calculation' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={6}>
                        <Grid item xs={2}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='firstTransaction'
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
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='rate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            disabled={true}
                                            label='='
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.rate)}
                                            placeholder='='
                                        />
                                    )}
                                />
                                {errors.rate && <FormHelperText sx={{ color: 'error.main' }}>{errors.rate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='secondTransaction'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Transaction 2</InputLabel>
                                            <Select
                                                label='Transaction 2'
                                                placeholder='Select Transaction 2'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    inputTransactionDefs.map(({ id, transactionName }) => {
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
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='calculationUnit'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Unit</InputLabel>
                                            <Select
                                                label='Unit'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    calculationUnitOptions.map(({ id, parameterName }) => {
                                                        return (
                                                            <MenuItem value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='firstOption'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Option 1</InputLabel>
                                            <Select
                                                label='Option 1'
                                                placeholder='Select Option 1'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    transactionCalculationOptions.map(({ id, parameterName }) => {
                                                        return (
                                                            <MenuItem value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='thirdTransaction'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Transaction 3</InputLabel>
                                            <Select
                                                label='Transaction 3'
                                                placeholder='Select Transaction 3'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    inputTransactionDefs.map(({ id, transactionName }) => {
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
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='secondOption'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Option 2</InputLabel>
                                            <Select
                                                label='Option 2'
                                                placeholder='Select Option 2'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    transactionCalculationOptions.map(({ id, parameterName }) => {
                                                        return (
                                                            <MenuItem value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='rate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Rate'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.rate)}
                                            placeholder='Enter Rate'
                                        />
                                    )}
                                />
                                {errors.rate && <FormHelperText sx={{ color: 'error.main' }}>{errors.rate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='large' onClick={() => reset()} type='reset' variant='contained' sx={{ mb: 7 }}>
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

export default AddTransactionParameterCalculation
