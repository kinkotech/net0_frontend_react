import {
    createBrowserRouter
} from "react-router-dom";
import Home from '@/pages/Home';
import FootBoard from '@/pages/Foot/Board';
import FootList from "@/pages/Foot/List";
import FootAdd from '@/pages/Foot/Add';
import FootParkType from '@/pages/Foot/ParkType';
import WaterElectricityGas from '@/pages/Foot/WaterElectricityGas';
import ReductionBoard from '@/pages/Reduction/board';
import ReductionDay from '@/pages/Reduction/day';
import ReductionYear from '@/pages/Reduction/year';
import ReductionSetting from "@/pages/Reduction/setting";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "foot",
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
        path: "addFoot/create",
        element: <FootAdd/>,
    },
    {
        path: 'reduction/board',
        element: <ReductionBoard/>
    },
    {
        path: 'reduction',
        element: <ReductionDay/>
    },
    {
        path: 'reduction/year',
        element: <ReductionYear/>
    },
    {
        path: 'reduction/setting',
        element: <ReductionSetting/>
    }
]);

export default Router;
