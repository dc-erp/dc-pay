// ** React Imports
import {useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
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
import { addMembership, editMembership } from 'src/store/apps/Tasks/Membership'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchTransactionDefinitionByGroup } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
})

const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
}



const AddMembership = ({
    formData,
}: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch])


    useEffect(() => {
        dispatch(
            fetchTransactionDefinitionByGroup({
                group: 'Membership'
            })
        )
    }, [dispatch])





    const {
        control,
        handleSubmit,
        reset,
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
            dispatch(editMembership({ ...data }))
        } else {
            dispatch(addMembership({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
    }


    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    return (
        <Card>
            <CardHeader title='Add Membership' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='employeeId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Employee</InputLabel>
                                    <Select
                                        label='Employee'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        placeholder='Select Employee'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            employeeStore.data.map(({ id, firstName, lastName }, index) => {
                                                return (
                                                    <MenuItem key={index} value={id}>{`${firstName} ${lastName}`}</MenuItem>
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
                            name='transactionId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <>
                                    <InputLabel id='demo-simple-select-autoWidth-label'>Transaction</InputLabel>
                                    <Select
                                        label='Transaction'
                                        placeholder='Select Transaction'
                                        value={value}
                                        id='demo-simple-select-autoWidth'
                                        labelId='demo-simple-select-autoWidth-label'
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        {
                                            transactionDefinitionStore.data.map(({ id, transactionName }, index) => {
                                                return (
                                                    <MenuItem key={index} value={id}>{`${transactionName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </>

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

export default AddMembership
