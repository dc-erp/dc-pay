import authorizerDao from './dao'
// import roleRightService from '../settings/rights-management/menu/service'

// const authorizeRights = (rights: string[]) => {
//     return async (req: any, res: any, next: any) => {
//         const routeName = req.baseUrl.slice(8);
//         const userId = req.headers['x-user-id'];
//         let hasRights = true;

//         for (const right of rights) {
//             if (right === 'read') {
//                 hasRights = hasRights && await authorizeRead(userId, routeName);
//             } else if (right === 'edit') {
//                 hasRights = hasRights && await authorizeEdit(userId, routeName);
//             }
//         }

//         if (hasRights) {
//             next();
//         } else {
//             res.redirect('/error');
//         }
//     }
// }



// const authorizeRead = async (userId: string, routeName: string) => await roleRightService.checkIfUserCanReadRoute(userId, routeName)

// const authorizeEdit = async (userId: string, routeName: string) => await roleRightService.checkIfUserCanEditRoute(userId, routeName)


const getNavigationMenu = async (roleId: string) => await authorizerDao.getNavigationMenu(roleId)


export default {
    getNavigationMenu,
    // authorizeRights
}