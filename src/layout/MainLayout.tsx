import React from "react";
import Header from "@/components/Header";
 
//必须使用React.ReactNode定义props类型
interface propsType{
    children: React.ReactNode
}
 
export const MainLayout : React.FC<propsType> = (props) => {
    return (
        <div className="layout d-flex flex-column w-100 h-100">
            <Header/>
            <div className='flex-1'>
                {props.children}
            </div>
        </div>
    )
}