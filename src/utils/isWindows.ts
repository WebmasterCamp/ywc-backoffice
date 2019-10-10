const isWindows = () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']

  if (windowsPlatforms.indexOf(platform) !== -1) {
    return true
  }

  return false
}

export default isWindows
