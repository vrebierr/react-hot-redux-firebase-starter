export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  rooms: [],
  room: {},
  messages: [],
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0
};
