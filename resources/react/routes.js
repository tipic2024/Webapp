import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//NewRegister
const NewUsers = React.lazy(() => import('./views/pages/register/NewUsers'))
const AllUser = React.lazy(() => import('./views/pages/register/AllUser'))



//Invoice
const Invoice = React.lazy(() => import('./views/pages/invoice/Invoice'))
const Orders = React.lazy(() => import('./views/pages/invoice/Orders'))
const InvoiceDetails = React.lazy(() => import('./views/pages/invoice/InvoiceDetails'))

//Products
const NewProduct = React.lazy(() => import('./views/pages/products/NewProduct'))
const NewCategory = React.lazy(() => import('./views/pages/category/NewCategory'))
const AllProducts = React.lazy(() => import('./views/pages/products/AllProducts'))
const AllCategory = React.lazy(() => import('./views/pages/category/AllCategory'))
const EditProduct = React.lazy(() => import('./views/pages/products/EditProduct'))
const EditCategory = React.lazy(() => import('./views/pages/category/EditCategory'))
const BulkQuantity = React.lazy(() => import('./views/pages/products/BulkQuantity'))


//Expense
const AllExpenseType = React.lazy(() => import('./views/pages/expense/AllExpenseType'))
const EditExpenseType = React.lazy(() => import('./views/pages/expense/EditExpenseType'))
const NewExpenseType = React.lazy(() => import('./views/pages/expense/NewExpenseType'))
const NewExpense = React.lazy(() => import('./views/pages/expense/NewExpense'))

//Reports
const ExpenseReport = React.lazy(() => import('./views/pages/report/ExpenseReport'))
const SalesReport = React.lazy(() => import('./views/pages/report/SalesReport'))
const PnLReport = React.lazy(() => import('./views/pages/report/PnLReport'))

//Password Newpassword
const Updatepassword = React.lazy(() => import('./views/pages/Password/Newpassword'))



const Charts = React.lazy(() => import('./views/charts/Charts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/invoice', name: 'Invoice', element: Invoice },
  { path: '/invoice-details/:id', name: 'InvoiceDetails', element: InvoiceDetails },
  { path: '/bookings', name: 'Advance Bookings', element: Orders },
  { path: '/regular', name: 'Regular Orders', element: Orders },
  { path: '/order', name: 'All Orders', element: Orders },
  { path: '/products/new', name: 'New Product', element: NewProduct },
  { path: '/category/new', name: 'New Category', element: NewCategory },
  { path: '/products/all', name: 'All Products', element: AllProducts },
  { path: '/category/all', name: 'All Products', element: AllCategory },
  { path: '/products/edit/:id', name: 'Edit Products', element: EditProduct },
  { path: '/category/edit/:id', name: 'Edit Products', element: EditCategory },
  { path: '/expense/new-type', name: 'New Type', element: NewExpenseType },
  { path: '/expense/edit-type/:id', name: 'Edit Type', element: EditExpenseType },
  { path: '/expense/all-type', name: 'All Types', element: AllExpenseType },
  { path: '/expense/new', name: 'New Expense', element: NewExpense },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/Reports/Expense_Report', name: 'Expense Report', element: ExpenseReport },
  { path: 'Reports/Sales_Report', name: 'Sales Report', element: SalesReport },
  { path: 'Reports/pnl_Report', name: 'Profit and Loss Report', element: PnLReport },
  { path: 'products/updateqty', name: 'Update Bulk Quantity', element: BulkQuantity },
  { path:'/updatepassword', name: 'Update Password', element: Updatepassword },
  { path:'/usermanagement/create-user', name: 'Create User', element: NewUsers },
  { path:'usermanagement/all-users', name: 'All Users', element: AllUser },
  
]

export default routes
