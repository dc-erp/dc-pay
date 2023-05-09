// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DateTimePicker from '@mui/lab/DateTimePicker'


import { Locale } from 'date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'


// // ** Icons Imports
// import InformationOutline from 'mdi-material-ui/InformationOutline'


// // ** Icons Imports
// import Phone from 'mdi-material-ui/Phone'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



// Unorganized Imports
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


interface State {
    password: string
    showPassword: boolean
}

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


const rolesArr = [
    'User Management',
    'Content Management',
    'Disputes Management',
    'Database Management',
    'Financial Management',
    'Reporting',
    'API Control',
    'Repository Management',
    'Payroll'
]


interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string
}

const AddRole = ({ formData }: any) => {
    const user = useSelector((state: any) => state.user)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [basicPicker, setBasicPicker] = useState<Date | null>(new Date())


    // ** State
    const [plan, setPlan] = useState<string>('basic')
    const [role, setRole] = useState<string>('subscriber')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()


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
        // if (data.id) {
        //     dispatch(editUser({ ...data, role, currentPlan: plan, creatorId: user.data[0].id }))
        // } else {
        //     dispatch(addUser({ ...data, role, currentPlan: plan, creatorId: user.data[0].id }))
        // }
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


    return (
        <Card>
            <CardHeader title='Add Role' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='roleName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Role Name'
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
                    <Typography variant='h6'>Role Permissions</Typography>
                    <TableContainer>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: '0 !important' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                fontSize: '0.875rem',
                                                alignItems: 'center',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            Administrator Access
                                            {/* <Tooltip placement='top' title='Allows a full access to the system'> */}
                                                {/* <InformationOutline sx={{ ml: 1, fontSize: '1rem' }} /> */}
                                            {/* </Tooltip> */}
                                        </Box>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <FormControlLabel
                                            label='Select All'
                                            control={<Checkbox size='small' />}
                                            sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rolesArr.map((i, index: number) => {
                                    return (
                                        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: 0 } }}>
                                            <TableCell sx={{ fontWeight: 600, color: theme => `${theme.palette.text.primary} !important` }}>
                                                {i}
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Read' />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Write' />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Create' />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

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

export default AddRole
