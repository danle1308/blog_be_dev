export const ROLE = {
    ADMIN: 0,
    MEMBER: 1,
    WATCHER: 2,
} as const

export const ROLE_LABEL = {
    [ROLE.ADMIN]: "admin",
    [ROLE.MEMBER]: "member",
    [ROLE.WATCHER]: "watcher",
}

export type RoleType = typeof ROLE[keyof typeof ROLE];
