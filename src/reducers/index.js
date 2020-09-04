import { combineReducers } from "redux";

import auth from "./auth-reducer";
import artists from "./artist-reducer";

export default combineReducers({ auth, artists });
