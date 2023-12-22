import {
    createBrowserRouter
} from "react-router-dom";
import Home from '@/pages/Home';
import FootBoard from '@/pages/Foot/Board';
import FootList from "@/pages/Foot/List";
import FootParkType from '@/pages/Foot/ParkType';
import WaterElectricityGas from '@/pages/Foot/WaterElectricityGas';
import Reduction from '@/pages/Reduction';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "foot/board",
        element: <FootBoard/>,
    },
    {
        path: "foot/parkType",
        element: <FootParkType/>,
    },
    {
        path: "foot/waterElectricityGas",
        element: <WaterElectricityGas/>,
    },
    {
        path: "foot/list",
        element: <FootList/>,
    },
    {
        path: 'reduction',
        element: <Reduction/>
    }
]);

export default Router;
