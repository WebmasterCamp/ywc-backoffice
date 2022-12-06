function makeEnum(x) {
  return x
}

export const AdminRole = makeEnum({
  STAFF: 'STAFF',
  COMMITTEE: 'COMMITTEE',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  CALLCENTER: 'CALLCENTER',
})

export const Major = makeEnum({
  CONTENT: 'CONTENT',
  PROGRAMMING: 'PROGRAMMING',
  DESIGN: 'DESIGN',
  MARKETING: 'MARKETING',
})

export const RegistrationStep = makeEnum({
  INFO: 'INFO',
  CONTACT: 'CONTACT',
  GENERAL: 'GENERAL',
  MAJOR: 'MAJOR',
  SUMMARY: 'SUMMARY',
})

export const UserStatus = makeEnum({
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
})
