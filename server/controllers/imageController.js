import imageKit from "../configs/imageKit.js";

// Controller to get ImageKit authentication parameters
// This function will be called when the client requests authentication parameters for uploading images to ImageKit
export const getImageKitAuth = (req, res) => {
  try {
    const authParams = imageKit.getAuthenticationParameters(); // Get authentication parameters from ImageKit
    res.json({
      success: true,
      ...authParams, // Send the authentication parameters back to the client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
