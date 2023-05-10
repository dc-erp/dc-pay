// ** React Imports
import {  useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


// ** Icons Imports
// import Phone from 'mdi-material-ui/Phone'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'





// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addBranch, editBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchRights } from 'src/store/apps/Settings/RightsManagement/Branch'

// ** Types Imports
import { AppDispatch } from 'src/store'




const schema = yup.object().shape({
    branchCode: yup.string(),
    branchName: yup.string()
})

const emptyValues = {
    branchCode: '',
    branchName: ''
}


const AddBranch = ({ formData }: any) => {
 

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
            dispatch(editBranch({ ...data, }))
        } else {
            dispatch(addBranch({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Add Branch' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='branchCode'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Branch Code'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.branchCode)}
                                    placeholder='Branch Code'
                                />
                            )}
                        />
                        {/* {errors.branchCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.branchCode.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='branchName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Branch Name'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.branchName)}
                                    placeholder='Branch Name'
                                />
                            )}
                        />
                        {/* {errors.branchName && <FormHelperText sx={{ color: 'error.main' }}>{errors.branchName.message}</FormHelperText>} */}
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

export default AddBranch
