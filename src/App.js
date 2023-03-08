import "./App.css"
import Home from "./Pages/Home";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { CartProvider, useCart } from "react-use-cart";
import NavBar from "./Components/NavBar";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./Routes";
import '@brainhubeu/react-carousel/lib/style.css';
import Category from "./Components/Category";

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});
const Routers=()=>{
  const element=useRoutes(routes)
  return(
    <>
    <NavBar/>
    {element}
    <Category/>
    </>
        
      
  )
}


function App() {
 
  return (
    <CartProvider>
    <BrowserRouter>
      <ApolloProvider client={client}>
      
      <Routers/>
     
    </ApolloProvider>
    </BrowserRouter>
    </CartProvider>
  
   
  );
}

export default App;
