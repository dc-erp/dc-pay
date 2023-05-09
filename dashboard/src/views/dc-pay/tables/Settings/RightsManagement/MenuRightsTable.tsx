// ** React Imports
import { useState, useEffect,  useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, editMenuRight } from 'src/store/apps/Settings/RightsManagement/Menu'
import { fetchData as fetchRole } from 'src/store/apps/Settings/UserManagement/Roles'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { MenuRightsType } from 'src/types/apps/Settings/RightsManagement/menuRightsType'


interface CellType {
    row: MenuRightsType
}



const MenuRightsTable = () => {
    // ** State
    const [role, setRole] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'menuTitle',
            headerName: 'Menu Title',
            renderCell: ({ row }: CellType) => {
                const { id, menuTitle } = row
                
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
                                    {`${menuTitle}`}
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'readAllowed',
            headerName: 'Read Allowed',
            renderCell: ({ row }: CellType) => (
                <ReadCheck
                    id={row.id}
                    readAllowed={row.readAllowed}
                />
            )
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'editAllowed',
            headerName: 'Edit Allowed',
            renderCell: ({ row }: CellType) => (
                <EditCheck
                    id={row.id}
                    editAllowed={row.editAllowed}
                />
            )
        }
    ]

    const ReadCheck = ({ readAllowed, id }: any) => {
        const [readAllowedState, setReadCheckedState] = useState(readAllowed);

        const handleReadChecked = (event: any, id: any) => {
            setReadCheckedState(event.target.checked);
            dispatch(editMenuRight({ id, readAllowed: String(!readAllowedState) }))
        }

        return (
            <>
                <Checkbox
                    checked={readAllowedState}
                    onChange={(e) => {
                        handleReadChecked(e, id)
                    }}
                    size='small'
                />
            </>
        )
    }

    const EditCheck = ({ editAllowed, id }: any) => {
        const [editAllowedState, setEditCheckedState] = useState(editAllowed);

        const handleEditChecked = (event: any, id: any) => {
            setEditCheckedState(event.target.checked);
            dispatch(editMenuRight({ id, editAllowed: String(!editAllowedState) }))
        }

        return (
            <>
                <Checkbox
                    checked={editAllowedState}
                    onChange={(e) => {
                        handleEditChecked(e, id)
                    }}
                    size='small'
                />
            </>
        )
    }




    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        dispatch(
            fetchRole({
                q: value,
            })
        )
    }, [dispatch, value])

    useEffect(() => {
        dispatch(
            fetchData({
                role,
                q: value,
            })
        )
    }, [dispatch, role, value])

    const roleStore = useSelector((state: RootState) => state.role)
    const store = useSelector((state: RootState) => state.menuRight)


    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const handleRoleChange = useCallback((e: SelectChangeEvent) => {
        setRole(e.target.value)
    }, [])


    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Menu Rights' />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='role-select'>Select Role</InputLabel>
                                    <Select
                                        fullWidth
                                        value={role}
                                        id='select-role'
                                        label='Select Role'
                                        labelId='role-select'
                                        onChange={handleRoleChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        {roleStore.data.map((i: any, index) => {
                                            return (
                                                <MenuItem key={index} value={i.id}>{i.roleName}</MenuItem>
                                            )
                                        })}

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

export default MenuRightsTable
