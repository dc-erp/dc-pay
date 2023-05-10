// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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
import { fetchData, deleteLoanTransaction } from 'src/store/apps/Tasks/LoanTransaction'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchTransactionDefinitionByGroup } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { LoanTransactionsType } from 'src/types/apps/Tasks/loanTransactionTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'


import AddLoanTransaction from 'src/views/dc-pay/forms/Tasks/AddLoanTransaction'






interface CellType {
    row: LoanTransactionsType
}


// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: theme.spacing(1.5, 4),
    color: theme.palette.text.primary
}))

const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [transaction, setTransaction] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        id: '',
        employeeId: '',
        transactionId: '',
        totalLoan: '',
        transactionAmount: '',
        remainingBalance: ''
    });


    const RowOptions = ({
        id,
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount,
        remainingBalance
    }: any) => {
        // ** Hooks
        const dispatch = useDispatch<AppDispatch>()

        // ** State
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

        const rowOptionsOpen = Boolean(anchorEl)

        const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
        }
        const handleRowOptionsClose = () => {
            setAnchorEl(null)
        }

        const handleEdit = () => {
            setFormData(
                {
                    id,
                    employeeId,
                    transactionId,
                    totalLoan,
                    transactionAmount,
                    remainingBalance
                }
            )
        }


        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deleteLoanTransaction(id))
            handleRowOptionsClose()
        }

        return (
            <>
                <IconButton size='small' onClick={handleRowOptionsClick}>
                    {/* <DotsVertical /> */}
                    Options
                </IconButton>
                <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    open={rowOptionsOpen}
                    onClose={handleRowOptionsClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    PaperProps={{ style: { minWidth: '8rem' } }}
                >
                    <MenuItem sx={{ p: 0 }}>
                        <Link href={`/apps/settings/user-management/view/${id}`} passHref>
                            <MenuItemLink>
                                {/* <EyeOutline fontSize='small' sx={{ mr: 2 }} /> */}
                                View
                            </MenuItemLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                        {/* <PencilOutline fontSize='small' sx={{ mr: 2 }} /> */}
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        {/* <DeleteOutline fontSize='small' sx={{ mr: 2 }} /> */}
                        Delete
                    </MenuItem>
                </Menu>
            </>
        )
    }

    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'employeeFirstName',
            headerName: 'Employee',
            renderCell: ({ row }: CellType) => {
                const { employeeFirstName, employeeLastName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${employeeFirstName} ${employeeLastName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'transactionName',
            headerName: 'Transaction',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.transactionName}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            field: 'totalLoan',
            minWidth: 150,
            headerName: 'Total Loan',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.totalLoan}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'transactionAmount',
            minWidth: 150,
            headerName: 'Transaction Amount',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.transactionAmount}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'remainingBalance',
            minWidth: 150,
            headerName: 'Remaining Balance',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.remainingBalance}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }: CellType) => (
                <RowOptions
                    id={row.id}
                    employeeId={row.employeeId}
                    transactionId={row.transactionId}
                    totalLoan={row.totalLoan}
                    transactionAmount={row.transactionAmount}
                    remainingBalance={row.remainingBalance}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.loanTransaction)

    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                transaction,
                q: value,
            })
        )
    }, [dispatch, employee, transaction, value])

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
                group: 'loan'
            })
        )
    }, [dispatch])


    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const handleEmployee = useCallback((e: SelectChangeEvent) => {
        setEmployee(e.target.value)
    }, [])

    const handleTransactionDefinitionChange = useCallback((e: SelectChangeEvent) => {
        setTransaction(e.target.value)
    }, [])

    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)


    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)


    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <AddLoanTransaction formData={formData} />
            </Grid>
            <Grid item xs={8}>
                <Card>
                    <CardHeader title='Loan Transaction' />
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
                                        onChange={handleEmployee}
                                        inputProps={{ placeholder: 'Select Employee' }}
                                    >
                                        {
                                            employeeStore.data.map(({ id, firstName, lastName }, index) => {
                                                return (
                                                    <MenuItem key={index} value={id}>{`${firstName} ${lastName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='transaction-select'>Select Transaction</InputLabel>
                                    <Select
                                        fullWidth
                                        value={transaction}
                                        id='select-transaction'
                                        label='Select Status'
                                        labelId='transaction-select'
                                        onChange={handleTransactionDefinitionChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        {
                                            transactionDefinitionStore.data.map(({ id, transactionName }, index) => {
                                                return (
                                                    <MenuItem key={index} value={id}>{`${transactionName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                            <DataGrid
                                autoHeight
                                rows={store.data}
                                columns={columns}
                                checkboxSelection
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
