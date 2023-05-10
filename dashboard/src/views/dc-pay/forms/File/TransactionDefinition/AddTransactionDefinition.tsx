// ** React Imports
import {useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import InputLabel from '@mui/material/InputLabel'



import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import FormControlLabel from '@mui/material/FormControlLabel'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addTransactionDefinition, editTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'

import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'


const schema = yup.object().shape({
    transactionCode: yup.string(),
    transactionName: yup.string(),
    shortName: yup.string(),
    transactionType: yup.string(),
    updateType: yup.string(),
    permanent: yup.string(),
    taxable: yup.string(),
    unTaxableLimit: yup.string(),
    affectByLeave: yup.string(),
    leaveDays: yup.string(),
    affectBackPayroll: yup.string(),
    affectBeneficiary: yup.string(),
    transactionGroup: yup.string(),
    glEntryBy: yup.string(),
    directAccount: yup.string(),
    contractGLAccount: yup.string()
})

const emptyValues = {
    transactionCode: '',
    transactionName: '',
    shortName: '',
    transactionType: '',
    updateType: '',
    permanent: '',
    taxable: '',
    unTaxableLimit: '',
    affectByLeave: '',
    leaveDays: '',
    affectBackPayroll: '',
    affectBeneficiary: '',
    transactionGroup: '',
    glEntryBy: '',
    directAccount: '',
    contractGLAccount: ''
}


const AddUser = ({ formData }: any) => {



    // ** State
    const [plan] = useState<string>('basic')
    const [role] = useState<string>('subscriber')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

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



    const subParameters = useSelector((state:RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)


    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);
        
return filteredChild
    }

    const transactionTypeOptions = filterSubParametersByName('Transaction Type')
    const transactionGroupOptions = filterSubParametersByName('Transaction Group')
    const updateTypeOptions = filterSubParametersByName('Transaction Update Type')



    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editTransactionDefinition({ ...data, role, currentPlan: plan }))
        } else {
            dispatch(addTransactionDefinition({ ...data, role, currentPlan: plan }))
        }
        reset(emptyValues)
    }


return (
        <Card>
            <CardHeader title='Add Transaction Definition' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='transactionCode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Transaction Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.transactionCode)}
                                            placeholder='Transaction Code'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='transactionName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.transactionName)}
                                            placeholder='Transaction Name'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='shortName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Short Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.shortName)}
                                            placeholder='Short Name'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='transactionType'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Transaction Type</InputLabel>
                                            <Select
                                                label='Transaction Type'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    transactionTypeOptions.map(({ id, parameterName }: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='updateType'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <>
                                            <FormLabel sx={{ mb: 4 }} >Update Type</FormLabel>
                                            <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                            {
                                                    updateTypeOptions.map(({ id, parameterName }: any, index: any) => {
                                                       
                                                        return (
                                                            <FormControlLabel key={index} value={id} control={<Radio />} label={parameterName} />
                                                        )
                                                    })
                                                }
                                            </RadioGroup>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup row>
                                <Controller
                                    name='permanent'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControlLabel
                                            label='Permanent'
                                            control={<Checkbox checked={value} onChange={onChange} name='controlled' />}
                                        />
                                    )}
                                />

                                <Controller
                                    name='taxable'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControlLabel
                                            label='Taxable'
                                            control={<Checkbox checked={value} onChange={onChange} name='controlled' />}
                                        />
                                    )}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='unTaxableLimit'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='UnTaxable Limit'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.unTaxableLimit)}
                                            placeholder='UnTaxable Limit'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup row sx={{ mb: 4 }}>
                                <Controller
                                    name='affectByLeave'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, } }) => (
                                        <FormControlLabel
                                            label='Affect By Leave'
                                            control={<Checkbox checked={value} onChange={onChange} name='controlled' />}
                                        />
                                    )}
                                />
                            </FormGroup>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='leaveDays'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Leave Days'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.leaveDays)}
                                            placeholder='Leave Days'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup row>
                                <Controller
                                    name='affectBackPayroll'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, } }) => (
                                        <FormControlLabel
                                            label='Affect Back Payroll'
                                            control={<Checkbox checked={value} onChange={onChange} name='controlled' />}
                                        />
                                    )}
                                />
                                <Controller
                                    name='affectBeneficiary'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, } }) => (
                                        <FormControlLabel
                                            label='Beneficiary'
                                            control={<Checkbox checked={value} onChange={onChange} name='controlled' />}
                                        />
                                    )}
                                />

                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='transactionGroup'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Transaction Group</InputLabel>
                                            <Select
                                                label='Transaction Group'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    transactionGroupOptions.map(({ id, parameterName }: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='glEntryBy'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, } }) => (
                                        <>
                                            <FormLabel>GL-Entry By</FormLabel>
                                            <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                                <FormControlLabel value='total' control={<Radio />} label='Total' />
                                                <FormControlLabel value='department' control={<Radio />} label='Department' />
                                                <FormControlLabel value='individual' control={<Radio />} label='Individual' />
                                                <FormControlLabel value='na' control={<Radio />} label='N/A' />
                                            </RadioGroup>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='directAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Direct Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.directAccount)}
                                            placeholder='Direct Account'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='contractGLAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Contra. GL Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.contractGLAccount)}
                                            placeholder='Contra. GL Account'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
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

export default AddUser
