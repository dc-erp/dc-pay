// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import TextField from '@mui/material/TextField'


// ** Icons Imports
// import Laptop from 'mdi-material-ui/Laptop'
// import ChartDonut from 'mdi-material-ui/ChartDonut'
// import CogOutline from 'mdi-material-ui/CogOutline'
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'



// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollDisplay'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { PayrollDisplayType } from 'src/types/apps/Reports/payrollDisplayType'


// import AddPayrollProcess from 'src/views/dc-pay/forms/Process/AddPayrollProcess'




// ** Vars
// const userRoleObj: UserRoleType = {
//     admin: <Laptop fontSize='small' sx={{ mr: 3, color: 'error.main' }} />,
//     author: <CogOutline fontSize='small' sx={{ mr: 3, color: 'warning.main' }} />,
//     editor: <PencilOutline fontSize='small' sx={{ mr: 3, color: 'info.main' }} />,
//     maintainer: <ChartDonut fontSize='small' sx={{ mr: 3, color: 'success.main' }} />,
//     subscriber: <AccountOutline fontSize='small' sx={{ mr: 3, color: 'primary.main' }} />
// }

interface CellType {
    row: PayrollDisplayType
}



const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'transactionName',
            headerName: 'Transaction',
            renderCell: ({ row }: CellType) => {
                const { transactionName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    noWrap
                                    component='a'
                                    variant='body2'
                                    sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                                >
                                    {transactionName}
                                </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'transactionAmount',
            headerName: 'Amount',
            renderCell: ({ row }: CellType) => {
                
                return (
                    <Typography noWrap variant='body2'>
                        {row.transactionAmount}
                    </Typography>
                )
            }
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollDisplay)
    const employeeStore = useSelector((state: RootState) => state.employee)

    const deductionStore = store.data.filter(({transactionTypeName}) =>( transactionTypeName === "Deduction Quantity" ||  transactionTypeName === "Deduction Amount"))
    const earningStore = store.data.filter(({transactionTypeName}) =>( transactionTypeName === "Earning Quantity" ||  transactionTypeName === "Earning Amount"))

    const deductionAmounts = deductionStore.filter((transaction: any) => transaction.transactionTypeName == 'Deduction Amount')
    const totalDeductions = deductionAmounts.reduce((sum, transaction: any) =>{ return ( sum + parseFloat(transaction.transactionAmount))}, 0)

    const earningAmounts = earningStore.filter((transaction: any) => transaction.transactionTypeName == 'Earning Amount')
    const totalEarnings = earningAmounts.reduce((sum, transaction: any) =>{ return ( sum + parseFloat(transaction.transactionAmount))}, 0)

    
    
    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                q: value,
                currentPlan: ''
            })
        )
    }, [dispatch, employee, status, value])

    
    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch])


    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const handleEmployeeChange = useCallback((e: SelectChangeEvent) => {
        setEmployee(e.target.value)
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Payroll Display' />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='employee-select'>Select Employee</InputLabel>
                                    <Select
                                        fullWidth
                                        value={employee}
                                        id='select-employee'
                                        label='Select Employee'
                                        labelId='employee-select'
                                        onChange={handleEmployeeChange}
                                        inputProps={{ placeholder: 'Select Employee' }}
                                    >
                                         {
                                            employeeStore.data.map(({ id, firstName, lastName }) => {
                                                return (
                                                    <MenuItem value={id}>{`${firstName} ${lastName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        </CardContent>
                        </Card>
            </Grid>
            <Grid item xs={12}>
                        <Grid container spacing={6}>
                        <Grid item xs={6}>
                        <Card>
                            <CardHeader title='Earnings' />
                            <DataGrid
                                autoHeight
                                rows={earningStore}
                                columns={columns}
                                checkboxSelection
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <Card>
                            <CardHeader title='Deductions' />
                            <DataGrid
                                autoHeight
                                rows={deductionStore}
                                columns={columns}
                                checkboxSelection
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                            </Card>
                        </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={3} xs={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                        <TextField
                                            disabled={true}
                                            label='Gross Taxable'
                                            value={'0'}
                                            placeholder='Gross Taxable'
                                        />
                            </FormControl>
                            </Grid>

                            <Grid item sm={3} xs={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                        <TextField
                                            disabled={true}
                                            label='Total Earning'
                                            value={`${totalEarnings}`}
                                            placeholder='Total Earning'
                                        />
                            </FormControl>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                        <TextField
                                            disabled={true}
                                            label='Total Deductions'
                                            value={`${totalDeductions}`}
                                            placeholder='Total Deductions'
                                        />
                            </FormControl>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <FormControl fullWidth sx={{ mb: 4 }}>
                                        <TextField
                                            disabled={true}
                                            label='Net Pay'
                                            value={`${totalEarnings - totalDeductions}`}
                                            placeholder='Net Pay'
                                        />
                            </FormControl>
                            </Grid>



                        </Grid>
                        </CardContent>
                        </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
