// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'

// ** Actions Imports
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
import { addEmployee, editEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'

import DatePicker from '@mui/lab/DatePicker'

import Grid from '@mui/material/Grid'

const schema = yup.object().shape({
    employeeCode: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    sex: yup.string(),
    contractStartDate: yup.string(),
    contractEndDate: yup.string(),
    employmentDate: yup.string(),
    employeeStatus: yup.string(),
    employeeType: yup.string(),
    monthlyWorkingHours: yup.string(),
    basicSalary: yup.string(),
    pensionNumber: yup.string(),
    tinNumber: yup.string(),
    workingDays: yup.string(),
    employeeBankAccount: yup.string(),
    employeeBank: yup.string(),
    employeeBranch: yup.string(),
    employeeDepartment: yup.string(),
    employeePosition: yup.string(),
})

const emptyValues = {
    id: '',
    employeeCode: '',
    contractStartDate: '',
    contractEndDate: '',
    employmentDate: '',
    firstName: '',
    lastName: '',
    sex: '',
    employeeStatus: '',
    employeeType: '',
    monthlyWorkingHours: '',
    basicSalary: '',
    pensionNumber: '',
    tinNumber: '',
    workingDays: '',
    employeeBank: '',
    employeeBankAccount: '',
    employeeBranch: '',
    employeeDepartment: '',
    employeePosition: '',
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

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
        dispatch(
            fetchDepartment({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        dispatch(
            fetchBranch({
                q: ''
            })
        )
    }, [dispatch])



 

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
            dispatch(editEmployee({ ...data }))
        } else {
            dispatch(addEmployee({ ...data }))
        }
        reset(emptyValues)
    }


    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)
    const branchOptions = useSelector((state: RootState) => state.branches)
    const departmentOptions = useSelector((state: RootState) => state.department)



    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);
        
return filteredChild
    }

    const bankOptions = filterSubParametersByName('Bank')
    const sexOptions = filterSubParametersByName('Sex')
    const employeeStatusOptions = filterSubParametersByName('Employee Status')
    const employeeTypeOptions = filterSubParametersByName('Employment Type')
    const employeePositionOptions = filterSubParametersByName('Employee Position')



    return (
        <Card>
            <CardHeader title='Add Employee' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeCode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Employee Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            placeholder='Employee Code'
                                        />
                                    )}
                                />
                                {errors.employeeCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeCode.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employmentDate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label='Employment Date'
                                                value={value}
                                                onChange={onChange}
                                                renderInput={(params: any) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.employmentDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.employmentDate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='contractStartDate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label='Contract Start Date'
                                                value={value}
                                                onChange={onChange}
                                                renderInput={(params: any) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.contractStartDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.contractStartDate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='contractEndDate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label='Contract End Date'
                                                value={value}
                                                onChange={onChange}
                                                renderInput={(params: any) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.contractEndDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.contractEndDate.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='firstName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='First Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.firstName)}
                                            placeholder='First Name'
                                        />
                                    )}
                                />
                                {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='lastName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Last Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.lastName)}
                                            placeholder='Last Name'
                                        />
                                    )}
                                />
                                {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='sex'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Sex</InputLabel>
                                            <Select
                                                label='Sex'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    sexOptions.map(({ id, parameterName }, index) => {
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeStatus'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Employee Status</InputLabel>
                                            <Select
                                                label='Employee Status'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    employeeStatusOptions.map(({ id, parameterName }, index) => {
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeType'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Employee Type</InputLabel>
                                            <Select
                                                label='Employment Type'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    employeeTypeOptions.map(({ id, parameterName }, index) => {
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='monthlyWorkingHours'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Monthly Working Hours'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.monthlyWorkingHours)}
                                            placeholder='Monthly Working Hours'
                                        />
                                    )}
                                />
                                {errors.monthlyWorkingHours && <FormHelperText sx={{ color: 'error.main' }}>{errors.monthlyWorkingHours.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='basicSalary'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Basic Salary'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.basicSalary)}
                                            placeholder='Basic Salary'
                                        />
                                    )}
                                />
                                {errors.basicSalary && <FormHelperText sx={{ color: 'error.main' }}>{errors.basicSalary.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='pensionNumber'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Pension Number'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.pensionNumber)}
                                            placeholder='Pension Number'
                                        />
                                    )}
                                />
                                {errors.pensionNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.pensionNumber.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='tinNumber'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='TIN Number'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.tinNumber)}
                                            placeholder='TIN Number'
                                        />
                                    )}
                                />
                                {errors.tinNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.tinNumber.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='workingDays'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Working Days'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.workingDays)}
                                            placeholder='Working Days'
                                        />
                                    )}
                                />
                                {errors.workingDays && <FormHelperText sx={{ color: 'error.main' }}>{errors.workingDays.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBank'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Select Bank Account</InputLabel>
                                            <Select
                                                label='Select Bank Account'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    bankOptions.map(({ id, parameterName }, index) => {
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
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBankAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Bank Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.employeeBankAccount)}
                                            placeholder='Bank Account'
                                        />
                                    )}
                                />
                                {errors.employeeBankAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeBankAccount.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBranch'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Branch</InputLabel>
                                            <Select
                                                label='Branch'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    branchOptions.data.map(({ id, branchName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{branchName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeDepartment'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Department</InputLabel>
                                            <Select
                                                label='Department'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    departmentOptions.data.map(({ id, departmentName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{departmentName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeePosition'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Position</InputLabel>
                                            <Select
                                                label='Position'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    employeePositionOptions.map(({ id, parameterName }, index) => {
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
