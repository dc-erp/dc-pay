// ** React Imports
import { useEffect } from 'react'


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



// Unorganized Imports

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addRole, editRole } from 'src/store/apps/Settings/UserManagement/Roles'



// ** Types Imports
import { AppDispatch } from 'src/store'


const schema = yup.object().shape({
    roleName: yup.string()
})

const emptyValues = {
    roleName: '',
}


const AddUser = ({ formData }: any) => {
    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

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
            dispatch(editRole({ ...data }))
        } else {
            dispatch(addRole({ ...data }))
        }
        reset(emptyValues)

    }

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
                                    error={Boolean(errors.roleName)}
                                    placeholder='Enter Role Name'
                                />
                            )}
                        />
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
