// Define the UserExitAttribute object structure (Renamed from QuitAttribute)
const UserExitAttribute = function(userIndex) {  // Renamed u_idx to userIndex
    this.userIndex = userIndex || null;
  };
  
  // Define the UserExitActionType object structure (Renamed from QuitActionType)
  const UserExitActionType = function(type, payload) {
    this.type = type;
    this.payload = payload;
  };
  
  // Define the UserExitAction class (Renamed from QuitAction)
  class UserExitAction {
    constructor() {
      this.REQUEST = 'USER_EXIT_REQUEST';  // Renamed from QUIT_REQUEST
      this.SUCCESS = 'USER_EXIT_SUCCESS';  // Renamed from QUIT_SUCCESS
      this.FAILURE = 'USER_EXIT_FAILURE';  // Renamed from QUIT_FAILURE
    }
  
    request(payload) {
      return { type: this.REQUEST, payload };
    }
  
    success(payload) {
      return { type: this.SUCCESS, payload };
    }
  
    failure(payload) {
      return { type: this.FAILURE, payload };  // Fixed: Changed from SUCCESS to FAILURE
    }
  }
  
  // Create an instance of the UserExitAction class
  const userExitAction = new UserExitAction();  // Renamed from quitAction
  
  // Export the modules
  module.exports = {
    UserExitAttribute,  // Renamed from QuitAttribute
    UserExitActionType,  // Renamed from QuitActionType
    userExitAction,  // Renamed from quitAction
  };
  