// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import DateTimePicker from '@mui/lab/DateTimePicker'


import { Locale } from 'date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'


// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import FormControlLabel from '@mui/material/FormControlLabel'

// Unorganized Imports
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addTransactionDefinition, editTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'

import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

interface State {
    password: string
    showPassword: boolean
}

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


interface UserData {
    transactionCode: string;
    transactionName: string;
    shortName: string;
    transactionType: string;
    updateType: string;
    permanent: string;
    taxable: string;
    unTaxableLimit: string;
    affectByLeave: string;
    leaveDays: string;
    affectBackPayroll: string;
    affectBeneficiary: string;
    transactionGroup: string;
    glEntryBy: string;
    directAccount: string;
    contractGLAccount: string;
}


const AddUser = ({ formData }: any) => {
    const user = useSelector((state: any) => state.user)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [basicPicker, setBasicPicker] = useState<Date | null>(new Date())


    // ** State
    const [plan, setPlan] = useState<string>('basic')
    const [role, setRole] = useState<string>('subscriber')

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

    useEffect(() => {
        reset(formData);
    }, [formData])

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
        setError,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editTransactionDefinition({ ...data, role, currentPlan: plan }))
        } else {
            dispatch(addTransactionDefinition({ ...data, role, currentPlan: plan }))
        }
        reset(emptyValues)
    }

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    const [confirmPassValues, setConfirmPassValues] = useState<State>({
        password: '',
        showPassword: false
    })



    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleClickConfirmPassShow = () => {
        setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }


    console.log(updateTypeOptions, "Rosie")
    
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
                                {errors.transactionCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.transactionCode.message}</FormHelperText>}
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
                                {errors.transactionName && <FormHelperText sx={{ color: 'error.main' }}>{errors.transactionName.message}</FormHelperText>}
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
                                {errors.shortName && <FormHelperText sx={{ color: 'error.main' }}>{errors.shortName.message}</FormHelperText>}
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
                                                    transactionTypeOptions.map(({ id, parameterName }: any) => {
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
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='updateType'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <FormLabel sx={{ mb: 4 }} >Update Type</FormLabel>
                                            <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                            {
                                                    updateTypeOptions.map(({ id, parameterName }: any) => {
                                                       
                                                        return (
                                                            <FormControlLabel value={id} control={<Radio />} label={parameterName} />
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
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                {errors.unTaxableLimit && <FormHelperText sx={{ color: 'error.main' }}>{errors.unTaxableLimit.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup row sx={{ mb: 4 }}>
                                <Controller
                                    name='affectByLeave'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                {errors.leaveDays && <FormHelperText sx={{ color: 'error.main' }}>{errors.leaveDays.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormGroup row>
                                <Controller
                                    name='affectBackPayroll'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                                    transactionGroupOptions.map(({ id, parameterName }: any) => {
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
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='glEntryBy'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
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
                                {errors.directAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.directAccount.message}</FormHelperText>}
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
                                {errors.contractGLAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.contractGLAccount.message}</FormHelperText>}
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
