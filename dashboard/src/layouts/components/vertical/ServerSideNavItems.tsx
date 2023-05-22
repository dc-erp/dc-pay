// ** React Imports
import { useEffect, useState } from 'react'


// ** Utils Import
import apiRequest from 'src/utils/apiRequest'

// ** Type Import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])

  useEffect(() => {
    apiRequest.get('/auth/navigation').then(response => {
      const menuArray = response.data

      const finalMenuArray = (items: VerticalNavItemsType) => {
        return items.map((item: any) => {
          if (item.icon) {
            // @ts-ignore
            // item.icon = Icons[item.icon]
            if (item.children) {
              finalMenuArray(item.children)
            }
           
            return item
          }

          return item
        })
      }

      setMenuItems(finalMenuArray(menuArray))
    })
  }, [])

  return menuItems
}

export default ServerSideNavItems
