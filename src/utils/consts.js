const GENERAL_USER = 'general'
const DEVELOPER_USER = 'developer'
const ADMINISTRATOR = 'administrator'
const USER_ROLES = [GENERAL_USER, DEVELOPER_USER, ADMINISTRATOR]

const USER_NAME = 'name'
const USER_EMAIL = 'email'
const USER_PASSWORD = 'password'
const USER_ROLE = 'role'
const USER_AVATAR = 'avatar'
const USER_TOKEN = 'token'
const USER_FIELDS = [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE, USER_AVATAR, USER_TOKEN]

const CREATE = 'create'
const UPDATE = 'update'
const READ = 'read'
const DELETE = 'delete'
const CRUD_OPERATIONS = [CREATE, UPDATE, READ, DELETE]

const TITLE = 'title'
const DESCRIPTION = 'description'
const STATUS = 'status'
const ASSIGNED = 'assigned'
const OWNER = 'owner'
const CREATOR = 'creator'
const _ID = '_id'
const UPDATEDAT = 'updatedAt'
const CREATEDAT = 'createdAt'
const __V = '__v'
const REPORT_FIELDS = [TITLE, DESCRIPTION, STATUS, ASSIGNED, OWNER, CREATOR, _ID, UPDATEDAT, CREATEDAT, __V]

const CRUD_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedOperations: [CREATE, READ, UPDATE]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedOperations: [CREATE, READ, UPDATE, DELETE]
    }
]

const UPDATES_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedUpdates: [TITLE, DESCRIPTION]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedUpdates: [TITLE, DESCRIPTION, STATUS, OWNER, ASSIGNED]
    }
]

const USER_EDIT_PERMISSIONS = [{
        allowedRole: GENERAL_USER,
        allowedEdits: [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_AVATAR]
    },
    {
        allowedRole: DEVELOPER_USER,
        allowedEdits: [USER_NAME, USER_EMAIL, USER_PASSWORD, USER_AVATAR]
    }
]

module.exports = {
    ADMINISTRATOR,
    GENERAL_USER,
    DEVELOPER_USER,
    ASSIGNED,
    OWNER,
    STATUS,
    USER_ROLES,
    USER_FIELDS,
    REPORT_FIELDS,
    CREATE,
    UPDATE,
    DELETE,
    CRUD_OPERATIONS,
    USER_EDIT_PERMISSIONS,
    CRUD_PERMISSIONS,
    UPDATES_PERMISSIONS
}