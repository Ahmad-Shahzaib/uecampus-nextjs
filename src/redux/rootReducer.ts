import { AnyAction, combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { clearStore } from "@/redux/utils";
import coursesReducer from "./slices/courses";
import faqsReducer from "./slices/faqs";
import aboutReducer from "./slices/aboutSlice";
import testinomialsReducer from "./slices/testinomialsSlice";
import heroReducer from "./slices/heroSlice";
import studentFeedbackReducer from "./slices/studentFeedback";
import featureCardsReducer from "./slices/featureCards";
import aboutSectionReducer from "./slices/aboutSection";
import howToApplyReducer from "./slices/howToApply";
import scholarshipReducer from "./slices/scholarship";
import onlineDegreeCardsReducer from "./slices/onlineDegreeCards";
import accreditationReducer from "./slices/accreditationSlice";
import internationalPartnershipReducer from "./slices/internationalPartnershipSlice";
import educationCardsReducer from "./slices/educationCardsSlice";
import contactUsReducer from "./slices/contactUsSlice";
import detailCourseReducer from "./slices/detailCourseSlice";

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

const featureCardsPersistConfig: PersistConfig<any> = {
  key: "featureCards",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const studentFeedbackPersistConfig: PersistConfig<any> = {
  key: "studentFeedback",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const aboutSectionPersistConfig = {
  key: "aboutSection",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const howToApplyPersistConfig = {
  key: "howToApply",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};

const scholarshipPersistConfig = {
  key: "scholarship",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};

const onlineDegreeCardsPersistConfig: PersistConfig<any> = {
  key: "onlineDegreeCards",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const accreditationPersistConfig: PersistConfig<any> = {
  key: "accreditation",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const internationalPartnershipPersistConfig: PersistConfig<any> = {
  key: "internationalPartnership",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const educationCardsPersistConfig: PersistConfig<any> = {
  key: "educationCards",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};
const contactUsPersistConfig: PersistConfig<any> = {
  key: "contactUs",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};
const detailCoursePersistConfig: PersistConfig<any> = {
  key: "detailCourse",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],          // keep the fetched data across reloads
};

const appReducer = combineReducers({
  courses: persistReducer(coursesPersistConfig, coursesReducer),
  faqs: persistReducer(faqsPersistConfig, faqsReducer),
  testinomials: persistReducer(testinomialsPersistConfig, testinomialsReducer),
  hero: persistReducer(heroPersistConfig, heroReducer),
  about: persistReducer(aboutPersistConfig, aboutReducer),
  featureCards: persistReducer(featureCardsPersistConfig, featureCardsReducer),
  studentFeedback: persistReducer(studentFeedbackPersistConfig, studentFeedbackReducer),
  aboutSection: persistReducer(aboutSectionPersistConfig, aboutSectionReducer),
  howToApply: persistReducer(howToApplyPersistConfig, howToApplyReducer),
  scholarship: persistReducer(scholarshipPersistConfig, scholarshipReducer),
  onlineDegreeCards: persistReducer(onlineDegreeCardsPersistConfig, onlineDegreeCardsReducer),
  accreditation: persistReducer(accreditationPersistConfig, accreditationReducer),
  internationalPartnership: persistReducer(internationalPartnershipPersistConfig, internationalPartnershipReducer),
  educationCards: persistReducer(educationCardsPersistConfig, educationCardsReducer),
  contactUs: persistReducer(contactUsPersistConfig, contactUsReducer),
  detailCourse: persistReducer(
    detailCoursePersistConfig,
    detailCourseReducer
  ),
  
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