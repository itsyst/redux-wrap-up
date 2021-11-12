import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './bugs';


const store = configureStore({ reducer: reducer });

export default store;