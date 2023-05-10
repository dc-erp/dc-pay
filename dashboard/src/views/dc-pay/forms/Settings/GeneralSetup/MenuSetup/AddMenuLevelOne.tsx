// ** React Imports
import {  useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addMenuLevelOne, editMenuLevelOne } from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelOne'
import { fetchData as fetchRights } from 'src/store/apps/Settings/RightsManagement/Menu'

// ** Types Imports
import { AppDispatch } from 'src/store'


const schema = yup.object().shape({
    menuTitle: yup.string(),
})

const emptyValues = {
    menuTitle: '',
}



const AddMenuLevelOne = ({ formData }: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchRights({
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
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    
    useEffect(() => {
        reset(formData);
    }, [formData, reset])


    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editMenuLevelOne({ ...data, }))
        } else {
            dispatch(addMenuLevelOne({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Add Menu Level 1' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='menuTitle'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Menu Level One Title'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.menuTitle)}
                                    placeholder='Menu Level One Title'
                                />
                            )}
                        />
                        {/* {errors.menuTitle && <FormHelperText sx={{ color: 'error.main' }}>{errors.menuTitle.message}</FormHelperText>} */}
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
