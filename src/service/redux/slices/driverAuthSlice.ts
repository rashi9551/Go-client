import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    driverId:"",
    driverToken:null,
    loggedIn:false
}

const driverAuthSlice=createSlice({
    name:"driverAuth",
    initialState,
    reducers:{
        driverLogin:((state,action)=>{
            state.name=action.payload.name,
            state.driverId=action.payload.driver_id,
            state.driverToken=action.payload.driverToken,
            state.loggedIn=true
        }),
        driverLogout:((state)=>{
            state.name="",
            state.driverId="",
            state.driverToken=null,
            state.loggedIn=false

        })
    }

})

export const{driverLogin,driverLogout}=driverAuthSlice.actions

export default driverAuthSlice