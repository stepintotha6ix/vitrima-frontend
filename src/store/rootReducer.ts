import { reducer as applicantReducer } from './user/applicant.slice'
import { reducer as contractorReducer } from './user/contractor.slice'

import { reducer as workerReducer } from './user/worker.slice'
import { reducer as filterReducer } from './work/filter.slice'
import { reducer as chatReducer } from './chat/chat.slice'
import cookieReducer from './user/cookie.slice'; // Default export, no curly braces

export const reducers = {
    applicant: applicantReducer,
    contractor: contractorReducer,
    worker: workerReducer,
    filter: filterReducer,
    chat: chatReducer,
    cookieBanner: cookieReducer
}