// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'


import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser, editUser } from 'src/store/apps/Settings/UserManagement/Users'
import { fetchData as fetchRoles } from 'src/store/apps/Settings/UserManagement/Roles'


// ** Types Imports
import { AppDispatch } from 'src/store'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'


const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    password: yup.string(),
})

const emptyValues = {
    firstName: '',
    lastName: '',
    roleId: '',
    email: '',
    password: ''
}


const AddUser = ({ formData }: any) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)



    // ** State
    const [plan, ] = useState<string>('basic')
    const [role,] = useState<string>('subscriber')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchRoles({
                q: ''
            })
        )
    }, [dispatch])

    const rolesStore = useSelector((state: RootState) => state.role)

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
    }, [reset, formData])

 
    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editUser({ ...data, role, currentPlan: plan }))
        } else {
            dispatch(addUser({ ...data, role, currentPlan: plan }))
        }
        reset(emptyValues)

    }



    return (
        <Card>
            <CardHeader title='Add User' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                        {/* {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>} */}
                    </FormControl>
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
                        {/* {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Email'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.email)}
                                    placeholder='Email'
                                />
                            )}
                        />
                        {/* {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='roleId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Role</InputLabel>
                                    <Select
                                        label='Role'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            rolesStore.data.map(({ id, roleName }: any) => {
                                                return (
                                                    <MenuItem key={id} value={id}>{roleName}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </>

                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                            Password
                        </InputLabel>
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <OutlinedInput
                                    value={value}
                                    onBlur={onBlur}
                                    label='Password'
                                    onChange={onChange}
                                    id='auth-login-v2-password'
                                    error={Boolean(errors.password)}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {/* {showPassword ? <EyeOutline /> : <EyeOffOutline />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            )}
                        />
                        {errors.password && (
                            <FormHelperText sx={{ color: 'error.main' }} id=''>
                                {/* {errors.password.message} */}
                            </FormHelperText>
                        )}
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

export default AddUser
