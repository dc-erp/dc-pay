// ** React Imports
import {  useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'



import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



import { RootState } from 'src/store'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { fetchData as fetchMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { addSubParameterDefinition, editSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    parameterId: yup.string(),
    parameterName: yup.string()

})

const emptyValues = {
    id: '',
    parameterId: '',
    parameterName: ''
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchMainParameterDefinition({
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
            dispatch(editSubParameterDefinition({ ...data }))
        } else {
            dispatch(addSubParameterDefinition({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }


    const mainParameterDefinitions = useSelector((state: RootState) => state.mainParameterDefinition)

    return (
        <Card>
            <CardHeader title='Add Sub Parameter' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='parameterId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Main Parameter Definition</InputLabel>
                                    <Select
                                        label='Main Parameter Definition'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            mainParameterDefinitions.data.map(({ id, parameterName }, index) => {
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
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='parameterName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Sub Parameter Name'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.parameterName)}
                                    placeholder='Sub Parameter Name'
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

export default AddMenuLevelTwo
