import { AnyAction, combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { clearStore } from "@/redux/utils";
import coursesReducer from "./slices/courses";

const createNoopStorage = () => ({
  getItem(): Promise<null> {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any): Promise<any> {
    return Promise.resolve(value);
  },
  removeItem(): Promise<void> {
    return Promise.resolve();
  },
});


const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};


const coursesPersistConfig: PersistConfig<any> = {
  key: "courses",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};




const appReducer = combineReducers({
  courses: persistReducer(coursesPersistConfig, coursesReducer),
});

const rootReducer: Reducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any | never,
) => {
  if (action.type === clearStore.type) {
    storage.removeItem("redux-root");
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export { rootPersistConfig, rootReducer };
