// ** React Imports
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


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
import { addHoliday, editHoliday } from 'src/store/apps/Settings/GeneralSetup/HolidaySetup'

// ** Types Imports
import { AppDispatch } from 'src/store'

import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'



const schema = yup.object().shape({
    holidayName: yup.string(),
    holidayDate: yup.string(),

})

const emptyValues = {
    holidayName: '',
    holidayDate: '',
}


const AddMenuLevelOne = ({ formData }: any) => {
    const user = useSelector((state: any) => state.user)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        reset(formData);
    }, [formData])

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

    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editHoliday({ ...data, }))
        } else {
            dispatch(addHoliday({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Add Holiday' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='holidayName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Holiday Name'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.menuTitle)}
                                    placeholder='Holiday Name'
                                />
                            )}
                        />
                        {/* {errors.holidayName && <FormHelperText sx={{ color: 'error.main' }}>{errors.holidayName.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='holidayDate'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label='Holiday Date'
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params: any) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                        {/* {errors.holidayDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.holidayDate.message}</FormHelperText>} */}
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

export default AddMenuLevelOne
