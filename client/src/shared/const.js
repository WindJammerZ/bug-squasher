export const ADDING_REPORT = 'ADDING_REPORT'
export const ASSIGNING_REPORT = 'ASSIGNING_REPORT'
export const CLOSING_REPORT = 'CLOSING_REPORT'
export const EDITING_REPORT = 'EDITING_REPORT'
export const DELETING_REPORT = 'DELETING_REPORT'

export const GENERAL_USER = 'general'
export const DEVELOPER_USER = 'developer'
export const ADMINISTRATOR = 'administrator'
export const USER_ROLES = [GENERAL_USER, DEVELOPER_USER, ADMINISTRATOR]

export const USER_NAME = 'name'
export const USER_EMAIL = 'email'
export const USER_PASSWORD = 'password'
export const USER_ROLE = 'role'
export const USER_AVATAR = 'avatar'
export const USER_TOKEN = 'token'
export const USER_FIELDS = [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE, USER_AVATAR, USER_TOKEN]

export const CREATE = 'create'
export const UPDATE = 'update'
export const READ = 'read'
export const DELETE = 'delete'
export const CRUD_OPERATIONS = [CREATE, UPDATE, READ, DELETE]

export const TITLE = 'title'
export const DESCRIPTION = 'description'
export const STATUS = 'status'
export const ASSIGNED = 'assigned'
export const OWNER = 'owner'
export const CREATOR = 'creator'
export const _ID = '_id'
export const UPDATEDAT = 'updatedAt'
export const CREATEDAT = 'createdAt'
export const __V = '__v'
export const REPORT_FIELDS = [TITLE, DESCRIPTION, STATUS, ASSIGNED, OWNER, CREATOR, _ID, UPDATEDAT, CREATEDAT, __V]

export const CRUD_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedOperations: [CREATE, READ, UPDATE]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedOperations: [CREATE, READ, UPDATE, DELETE]
    }
]

export const UPDATES_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedUpdates: [TITLE, DESCRIPTION]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedUpdates: [TITLE, DESCRIPTION, STATUS, ASSIGNED]
    }
]

export const USER_EDIT_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedEdits: [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_AVATAR]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedEdits: [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_AVATAR]
    }
]