// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

// Styled Card component
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'url(/images/pages/tree-cone-cube-bg-light.png)'
      : 'url(/images/pages/tree-cone-cube-bg-dark.png)'
}))

// Styled TextField component
const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('sm')]: {
    width: '55%'
  }
}))

const FaqHeader = (props: Props) => {
  // ** Props
  const { searchTerm, setSearchTerm } = props

  const handleFaqFilter = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Card>
      <CardContent sx={{ pt: 23, textAlign: 'center', pb: theme => `${theme.spacing(23)} !important` }}>
        <Typography variant='h5' sx={{ mb: 2.5, fontWeight: 600, color: 'primary.main' }}>
          Hello, how can we help?
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.5 }}>
          or choose a category to quickly find the help you need
        </Typography>
        <TextField
          value={searchTerm}
          placeholder='Search a question....'
          onChange={e => handleFaqFilter(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon icon='mdi:magnify' />
              </InputAdornment>
            )
          }}
        />
      </CardContent>
    </Card>
  )
}

export default FaqHeader
