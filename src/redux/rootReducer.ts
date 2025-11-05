// src/redux/rootReducer.ts
import { AnyAction, combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { clearStore } from "@/redux/utils";
import coursesReducer from "./slices/courses";
import faqsReducer from "./slices/faqs";
import aboutReducer from "./slices/aboutSlice";
import testinomialsReducer from "./slices/testinomialsSlice";
import heroReducer from "./slices/heroSlice";
import studentFeedbackReducer from "./slices/studentFeedback"; // Add this import

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
const aboutPersistConfig: PersistConfig<any> = {
  key: "about",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const faqsPersistConfig: PersistConfig<any> = {
  key: "faqs",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const heroPersistConfig: PersistConfig<any> = {
  key: "hero",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const testinomialsPersistConfig: PersistConfig<any> = {
  key: "testinomials",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

// Add persist config for student feedback
const studentFeedbackPersistConfig: PersistConfig<any> = {
  key: "studentFeedback",
  storage,
  keyPrefix: "redux-",
  whitelist: [], // You can add properties to persist if needed
};

const appReducer = combineReducers({
  courses: persistReducer(coursesPersistConfig, coursesReducer),
  faqs: persistReducer(faqsPersistConfig, faqsReducer),
  testinomials: persistReducer(testinomialsPersistConfig, testinomialsReducer),
  hero: persistReducer(heroPersistConfig, heroReducer),
  about: persistReducer(aboutPersistConfig, aboutReducer),
  // Add student feedback reducer
  studentFeedback: persistReducer(studentFeedbackPersistConfig, studentFeedbackReducer),
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