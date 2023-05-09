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



import { RootState } from 'src/store'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { fetchData as fetchMenuLevelOne } from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelOne'
import { addMenuLevelTwo, editMenuLevelTwo } from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelTwo'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    menuLevelOneId: yup.string(),
    menuTitle: yup.string()

})

const emptyValues = {
    id: '',
    menuLevelOneId: '',
    menuTitle: ''
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [menuLevelOne, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchMenuLevelOne({
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
            dispatch(editMenuLevelTwo({ ...data }))
        } else {
            dispatch(addMenuLevelTwo({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }


    const menuLevelOnes = useSelector((state: RootState) => state.menuLevelOne)

    console.log(menuLevelOnes)
    
return (
        <Card>
            <CardHeader title='Add Menu Level 2' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='menuLevelOneId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Select Menu Level One</InputLabel>
                                    <Select
                                        label='Select Menu Level One'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            menuLevelOnes.data.map(({ id, menuTitle }) => {
                                                return (
                                                    <MenuItem value={id}>{menuTitle}</MenuItem>
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
                            name='menuTitle'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Sub Parameter Name'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.menuTitle)}
                                    placeholder='Sub Parameter Name'
                                />
                            )}
                        />
                        {errors.menuTitle && <FormHelperText sx={{ color: 'error.main' }}>{errors.menuTitle.message}</FormHelperText>}
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
