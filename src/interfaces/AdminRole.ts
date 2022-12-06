export const AdminRole = {
  STAFF: 'STAFF',
  COMMITTEE: 'COMMITTEE',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  CALLCENTER: 'CALLCENTER',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AdminRole = typeof AdminRole[keyof typeof AdminRole]
