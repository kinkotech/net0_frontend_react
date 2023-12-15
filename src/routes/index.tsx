import {
    createBrowserRouter
} from "react-router-dom";
import Home from '@/pages/Home';
import FootBoard from '@/pages/Foot/Board';
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
        path: 'reduction',
        element: <Reduction/>
    }
]);

export default Router;
