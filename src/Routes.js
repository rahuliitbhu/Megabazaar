import Cart from "./Components/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Product_ByCategory from "./Pages/Product_ByCategory";
import Signup from "./Pages/Signup";

const routes=[
    {path:"/" ,element:<Home/>},
    {path:"/login" ,element:<Login/>},
    {path:"/signup" ,element:<Signup/>},
    {path:"/product/:pid" ,element:<Product/>},
    {path:"/cart" ,element:<Cart/>},
    {path:"/productbycategory/:catid" ,element:<Product_ByCategory/>}
]

export default routes;