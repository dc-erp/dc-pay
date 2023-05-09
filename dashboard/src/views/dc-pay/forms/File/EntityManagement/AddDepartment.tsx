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

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'

// ** Actions Imports
import { addDepartment, editDepartment } from 'src/store/apps/File/EntityManagement/Department'
import { fetchData as fetchBranches } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    branchId: yup.string(),
    departmentCode: yup.string(),
    departmentName: yup.string(),
    permanentAccount: yup.string(),
    contractAccount: yup.string()
})

const emptyValues = {
    branchId: '',
    departmentCode: '',
    departmentName: '',
    permanentAccount: '',
    contractAccount: ''
}



const AddDepartment = ({ formData }: any) => {
    const user = useSelector((state: any) => state.user)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const branchStore = useSelector((state: RootState) => state.branches)


    useEffect(() => {
        dispatch(
            fetchBranches({
                q: ''
            })
        )
    }, [dispatch, ''])

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
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editDepartment({ ...data, }))
        } else {
            dispatch(addDepartment({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Add Department' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='branchId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-outlined-label'>Select Branch</InputLabel>
                                    <Select
                                        label='Select Branch'
                                        value={value}
                                        id='demo-simple-select-outlined'
                                        labelId='demo-simple-select-outlined-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            branchStore.data.map(({ id, branchName }: any) => {
                                                return (
                                                    <MenuItem value={id}>{branchName}</MenuItem>
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
                            name='departmentCode'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Department Code'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.departmentCode)}
                                    placeholder='Enter Department Code'
                                />
                            )}
                        />
                        {errors.departmentCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.departmentCode.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='departmentName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Department Name'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.departmentName)}
                                    placeholder='Enter Department Name'
                                />
                            )}
                        />
                        {errors.departmentName && <FormHelperText sx={{ color: 'error.main' }}>{errors.departmentName.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='permanentAccount'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Permanent Account'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.permanentAccount)}
                                    placeholder='Permanent Account'
                                />
                            )}
                        />
                        {errors.permanentAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.permanentAccount.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='contractAccount'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Contract Account'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.contractAccount)}
                                    placeholder='Contract Account'
                                />
                            )}
                        />
                        {errors.contractAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.contractAccount.message}</FormHelperText>}
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

export default AddDepartment
