// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

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

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deletePayTransaction } from 'src/store/apps/Tasks/PayTransaction'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { PayTransactionType } from 'src/types/apps/Tasks/payTransactionTypes'


interface BranchesType {
    id: string;
    parameterName: string;
}

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'


import AddPayTransaction from 'src/views/dc-pay/forms/Tasks/AddPayTransaction'





interface CellType {
    row: PayTransactionType
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
        transactionAmount: ''
    });


    const RowOptions = ({
        id,
        employeeId,
        transactionId,
        transactionAmount
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
                    transactionAmount,
                }
            )
        }


        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deletePayTransaction(id))
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
                    transactionAmount={row.transactionAmount}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payTransaction)

    const deductionStore = store.data.filter(({transactionTypeName}) =>( transactionTypeName === "Deduction Quantity" ||  transactionTypeName === "Deduction Amount"))
    const earningStore = store.data.filter(({transactionTypeName}) =>( transactionTypeName === "Earning Quantity" ||  transactionTypeName === "Earning Amount"))


    console.log(store.data, "WHY WHY")


    console.log(earningStore, "Earning Store")
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
            fetchTransactionDefinition({
                q: ''
            })
        )
    }, [dispatch])


    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <AddPayTransaction formData={formData} />
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title='Earnings' />
                    <CardContent>
                        <Grid item xs={12}>
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
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title='Deductions' />
                    <CardContent>
                        <Grid item xs={12}>
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
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
