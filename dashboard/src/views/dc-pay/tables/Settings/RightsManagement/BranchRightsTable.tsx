// ** React Imports
import { useState, useEffect, useCallback } from 'react'

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
import { fetchData, editBranchRight } from 'src/store/apps/Settings/RightsManagement/Branch'
import { fetchData as fetchRole } from 'src/store/apps/Settings/UserManagement/Roles'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { BranchRightsType } from 'src/types/apps/Settings/RightsManagement/branchRightsTypes'



interface CellType {
    row: BranchRightsType
}



const BranchRightsTable = () => {
    // ** State
    const [role, setRole] = useState<string>('')
    const [value,] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)



    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'branchName',
            headerName: 'Branch Name',
            renderCell: ({ row }: CellType) => {
                const { id, branchName } = row
                
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
                                    {`${branchName}`}
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
            field: 'allowed',
            headerName: 'Allowed',
            renderCell: ({ row }: CellType) => (
                <AllowedCheck
                    id={row.id}
                    branchName={row.branchName}
                    allowed={row.allowed}
                />
            )
        }
    ]

    const AllowedCheck = ({ allowed, id }: any) => {
        const [allowedState, setAllowedCheckedState] = useState(allowed);

        const handleAllowedChecked = (event: any, id: any) => {
            setAllowedCheckedState(event.target.checked);
            dispatch(editBranchRight({ id, allowed: String(!allowedState) }))
        }

        return (
            <>
                <Checkbox
                    checked={allowedState}
                    onChange={(e) => {
                        handleAllowedChecked(e, id)
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

    const store = useSelector((state: RootState) => state.branchRight)


    const handleRoleChange = useCallback((e: SelectChangeEvent) => {
        setRole(e.target.value)
    }, [])

  

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Branch Rights' />
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
                                        {roleStore.data.map((i: any, index: any) => {
                                            return (
                                                <MenuItem key={index} value={i.id}>{i.roleName}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
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

export default BranchRightsTable
