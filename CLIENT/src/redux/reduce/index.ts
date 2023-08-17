import userReducer from "./userSlice";
import updateReducer from "./updateSlice";
const rootReducer = { user: userReducer, update: updateReducer  };

export default rootReducer;
