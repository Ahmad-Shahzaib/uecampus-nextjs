/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, combineReducers } from "redux";
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
import heroSectionReducer from "./slices/heroSectionSlice"; // Add this import
import missionReducer from "./slices/missionSlice";
import programsReducer from "./slices/programsSlice";
import randomCoursesReducer from "./slices/randomCoursesSlice";

type GenericPersistConfig = PersistConfig<any>;

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

const rootPersistConfig: GenericPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const coursesPersistConfig: GenericPersistConfig = {
  key: "courses",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const aboutPersistConfig: GenericPersistConfig = {
  key: "about",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const faqsPersistConfig: GenericPersistConfig = {
  key: "faqs",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const heroPersistConfig: GenericPersistConfig = {
  key: "hero",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const testinomialsPersistConfig: GenericPersistConfig = {
  key: "testinomials",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const featureCardsPersistConfig: GenericPersistConfig = {
  key: "featureCards",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const studentFeedbackPersistConfig: GenericPersistConfig = {
  key: "studentFeedback",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const aboutSectionPersistConfig: GenericPersistConfig = {
  key: "aboutSection",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const howToApplyPersistConfig: GenericPersistConfig = {
  key: "howToApply",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};

const scholarshipPersistConfig: GenericPersistConfig = {
  key: "scholarship",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};

const onlineDegreeCardsPersistConfig: GenericPersistConfig = {
  key: "onlineDegreeCards",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const accreditationPersistConfig: GenericPersistConfig = {
  key: "accreditation",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const internationalPartnershipPersistConfig: GenericPersistConfig = {
  key: "internationalPartnership",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const educationCardsPersistConfig: GenericPersistConfig = {
  key: "educationCards",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};
const contactUsPersistConfig: GenericPersistConfig = {
  key: "contactUs",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};
const detailCoursePersistConfig: GenericPersistConfig = {
  key: "detailCourse",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],          // keep the fetched data across reloads
};

const heroSectionPersistConfig: GenericPersistConfig = {
  key: "heroSection",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"], // keep the fetched data across reloads
};

const missionPersistConfig: GenericPersistConfig = {
  key: "mission",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"], // keep the fetched data across reloads
};
const programsPersistConfig: GenericPersistConfig = {
  key: "programs",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};
const randomCoursesPersistConfig: GenericPersistConfig = {
  key: "randomCourses",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
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
  heroSection: persistReducer(heroSectionPersistConfig, heroSectionReducer), // Add this line
  mission: persistReducer(missionPersistConfig, missionReducer),
  programs: persistReducer(programsPersistConfig, programsReducer),
  randomCourses: persistReducer(
    randomCoursesPersistConfig,
    randomCoursesReducer
  ),
});

type AppState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: AppState | undefined,
  action: AnyAction,
): AppState => {
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