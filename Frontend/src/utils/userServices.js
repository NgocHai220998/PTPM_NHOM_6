function verify (user) {
  if (user && user.token && user.token !== '') {
    return true
  }
  return false
}

export default {
  verify
}
