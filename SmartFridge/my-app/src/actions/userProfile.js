// Define the UserIndex object structure
const UserIndex = function(userIndex, userAlias, userId, error) {
    this.userIndex = userIndex;
    this.userAlias = userAlias || null;
    this.userId = userId || null;
    this.error = error || null;
  };
  
  // Define the ProfileActionType object structure
  const ProfileActionType = function(type, payload) {
    this.type = type;
    this.payload = payload;
  };
  
  // Define the ProfileAction class
  class ProfileAction {
    constructor() {
      this.REQUEST = 'PROFILE_REQUEST';
      this.SUCCESS = 'PROFILE_SUCCESS';
      this.FAILURE = 'PROFILE_FAILURE';
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
  
  // Create an instance of the ProfileAction class
  const profileActions = new ProfileAction();
  
  // Export the modules
  module.exports = {
    UserIndex,
    ProfileActionType,
    profileActions,
  };
  