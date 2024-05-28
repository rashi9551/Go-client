import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import pendingModalSlice from "./slices/pendingModalSlice";
import rejectModalSlice from "./slices/rejectModalSlice";
import storage from "redux-persist/lib/storage";

import { userAuthSlice } from "./slices/userAuthSlice";
import driverAuthSlice from "./slices/driverAuthSlice";
import adminAuthSlice from "./slices/adminAuthSlice";

const userPersistConfig={key:"userAuth",storage,version:1}
const driverPersistConfig={key:"driverAuth",storage,version:1}
const adminPersistConfig={key:"adminAuth",storage,version:1}

const userAuthPersistReducer=persistReducer(userPersistConfig,userAuthSlice.reducer)
const driverAuthPersistReducer=persistReducer(driverPersistConfig,driverAuthSlice.reducer)
const adminAuthPersistReducer=persistReducer(adminPersistConfig,adminAuthSlice.reducer)

export const store=configureStore({
    reducer:{
        user:userAuthPersistReducer,
        driver:driverAuthPersistReducer,
        admin:adminAuthPersistReducer,
        pendingModal: pendingModalSlice,
        rejectModal:rejectModalSlice
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
        return middleware;
    },

})

export const persistor=persistStore(store)