const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      // .cookie('accessToken', false, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'None',
      // })
      .clearCookie('accessToken')

      .json({
        success: true,
        message: "User logout suceesully"
      })
  } catch (error) {
    res.status(400).json({ messsage: "User nor logged out", error })
  }
}

export default logout