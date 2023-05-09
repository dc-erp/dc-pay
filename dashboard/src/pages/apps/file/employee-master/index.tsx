// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'


import moment from 'moment'


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
import CardContent from '@mui/material/CardContent'
import { SelectChangeEvent } from '@mui/material/Select'

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
import { fetchData, deleteEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { EmployeesType } from 'src/types/apps/File/employeesTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'


import AddEmployee from 'src/views/dc-pay/forms/File/EmployeeMaster/AddEmployee'


interface CellType {
    row: EmployeesType
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
    const [role, setRole] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        id: '',
        employeeCode: '',
        contractStartDate: '',
        contractEndDate: '',
        employmentDate: '',
        firstName: '',
        lastName: '',
        sex: '',
        employeeStatus: '',
        employeeType: '',
        monthlyWorkingHours: '',
        basicSalary: '',
        pensionNumber: '',
        tinNumber: '',
        workingDays: '',
        employeeBank: '',
        employeeBankAccount: '',
        employeeBranch: '',
        employeeDepartment: '',
        employeePosition: '',
    });


    const RowOptions = ({ id, employeeCode,
        contractStartDate,
        contractEndDate,
        employmentDate,
        firstName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        monthlyWorkingHours,
        basicSalary,
        pensionNumber,
        tinNumber,
        workingDays,
        employeeBank,
        employeeBankAccount,
        employeeBranch,
        employeeDepartment,
        employeePosition
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
                    employeeCode,
                    contractStartDate,
                    contractEndDate,
                    employmentDate,
                    firstName,
                    lastName,
                    sex,
                    employeeStatus,
                    employeeType,
                    monthlyWorkingHours,
                    basicSalary,
                    pensionNumber,
                    tinNumber,
                    workingDays,
                    employeeBank,
                    employeeBankAccount,
                    employeeBranch,
                    employeeDepartment,
                    employeePosition
                }
            )
        }

        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deleteEmployee(id))
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
            field: 'fullName',
            headerName: 'Name',
            renderCell: ({ row }: CellType) => {
                const { id, firstName, lastName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Link href={`/apps/user/view/${id}`} passHref>
                                <Typography
                                    noWrap
                                    component='a'
                                    variant='body2'
                                    sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                                >
                                    {`${firstName} ${lastName}`}
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'basicSalary',
            headerName: 'Basic Salary',
            renderCell: ({ row }: CellType) => {

                return (
                    <Typography noWrap variant='body2'>
                        {row.basicSalary}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            field: 'employmentDate',
            minWidth: 150,
            headerName: 'Employment Date',
            renderCell: ({ row }: CellType) => {

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {`${moment(row.employmentDate).format("YYYY/MM/DD")}`}
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
                    employeeCode={row.employeeCode}
                    employeeBranch={row.employeeBranch}
                    employeeDepartment={row.employeeDepartment}
                    firstName={row.firstName}
                    lastName={row.lastName}
                    basicSalary={row.basicSalary}
                    employmentDate={row.employmentDate}
                    sex={row.sex}
                    employeeStatus={row.employeeStatus}
                    employeeType={row.employeeType}
                    employeePosition={row.employeePosition}
                    contractStartDate={row.contractStartDate}
                    contractEndDate={row.contractEndDate}
                    monthlyWorkingHours={row.monthlyWorkingHours}
                    pensionNumber={row.pensionNumber}
                    tinNumber={row.tinNumber}
                    workingDays={row.workingDays}
                    employeeBankAccount={row.employeeBankAccount}
                    employeeBank={row.employeeBank}

                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.employee)


    useEffect(() => {
        dispatch(
            fetchData({
                role,
                status,
                q: value,
                currentPlan: ''
            })
        )
    }, [dispatch, role, status, value])




    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

   
    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <AddEmployee formData={formData} />
            </Grid>
            <Grid item xs={8}>
                <Card>
                    <CardHeader title='Employees' />
                    <CardContent>
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
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default UserList
