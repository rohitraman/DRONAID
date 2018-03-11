define({ "api": [
  {
    "type": "get",
    "url": "localhost:3000/makeAppointment",
    "title": "Request an appointment",
    "description": "<p>Used to request an appointment with a doctor</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MakeAppointmentError",
            "description": "<p>There was an error during making an appointment. Checks are done sequentially. The first false after success is where the error occurred.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MakeAppointmentError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"doctorUsernameExistsPassed\": true\n  \"doctorAuthPassed\": true\n  \"patientUsernameExistsPassed\": true\n  \"scheduleFreePassed\": false\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n-H 'Authorization: <JWT token here>'\n'localhost:3000/makeAppointment?\ndUsername=doctor&\npUsername=patient&\ndate=<Date Object>&\nreason=Headache'",
        "type": "curl"
      }
    ],
    "group": "Make_Appointment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Will contain JWT Token given to the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"<JWT Token here>\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "MakeAppointmentRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dUsername",
            "description": "<p>Mandatory doctor username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pUsername",
            "description": "<p>Mandatory patient username.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Mandatory date object containing start time of appointment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "reason",
            "description": "<p>Reason for appointment. Duration of appointment will be decided by doctor using this.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"dUsername\": \"doctor\"\n  \"pUsername\": \"patient\"\n  \"date\": <Date Object>\n  \"reason\": Headache\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/makeAppointment.js",
    "groupTitle": "Make_Appointment"
  },
  {
    "type": "get",
    "url": "localhost:3000/requestDrone",
    "title": "Request a drone",
    "description": "<p>Request for a drone to be sent to a location</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DistanceError",
            "description": "<p>The location is farther than the drone's capacity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "DistanceError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"message\": \"DistanceError\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n'localhost:3000/requestDrone?\nusername=bennyhawk\npassword=password\nlat=<Number Object>\nlong=<Number Object>'",
        "type": "curl"
      }
    ],
    "group": "Request_Drone",
    "name": "RequestDrone",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Mandatory username needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory password needed</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Mandatory latitude of position</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "long",
            "description": "<p>Mandatory longitude of position</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n  \"password\": \"password\"\n  \"lat\": <Number Object>\n  \"long\": <Number Object>\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>Gives distance of the drone station in meters</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "station",
            "description": "<p>Gives the id of the closest drone station</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n  \"distance\" : 26\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/requestDrone.js",
    "groupTitle": "Request_Drone"
  },
  {
    "type": "get",
    "url": "localhost:3000/searchDoctor",
    "title": "Search a doctor",
    "description": "<p>Search a doctor by username</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SearchDoctorError",
            "description": "<p>The requested doctor's username is not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SearchDoctorError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"doctorUsernameExistsPassed\": false\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n'localhost:3000/searchDoctor?\ndUsername=doctor'",
        "type": "curl"
      }
    ],
    "group": "Search_Operations",
    "name": "Search_Doctor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dUsername",
            "description": "<p>Mandatory doctor username needed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"dUsername\": \"doctor\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n  \"username\": <Username of doctor>\n  \"age\": <Age of doctor>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/searchDoctor.js",
    "groupTitle": "Search_Operations"
  },
  {
    "type": "get",
    "url": "localhost:3000/mad/register",
    "title": "Create a user",
    "description": "<p>Used to create an account on the DRONAID server. The account can be either a patient, doctor or an admin account. Every account must have a unique username. The account should have a password with a length greater than 8 characters</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RegisterError",
            "description": "<p>There was an error during registration.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "RegisterError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"usernamePassed\": true\n  \"passwordPassed\": false\n  \"accountTypePassed\": true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n'localhost:3000/mad/register?\nusername=bennyhawk&\npassword=password&\naccounttype=patient'",
        "type": "curl"
      }
    ],
    "group": "User_Operations",
    "name": "Create_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Unique username for the account.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of length greater than 8 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accounttype",
            "description": "<p>Type of account to be created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n  \"password\": \"password\"\n  \"accounttype\": \"patient\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Gives access token to be placed in the Authorization header for further requests</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n  \"token\" : <JWT Token>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/register.js",
    "groupTitle": "User_Operations"
  },
  {
    "type": "get",
    "url": "localhost:3000/mad/deleteUser",
    "title": "Delete a user",
    "description": "<p>Used to soft delete a user from the database. This endpoint only soft deletes the account. Hard delete will require backend intervention.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DeleteUserError",
            "description": "<p>There was an error during deleting the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "DeleteUserError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"usernameExistsPassed\": true\n  \"credentialsPassed\": false\n  \"deleteSuccessful\": false\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n-H 'Authorization: <JWT token here>'\n'localhost:3000/mad/deleteUser?\nusername=bennyhawk\npassword=password'",
        "type": "curl"
      }
    ],
    "group": "User_Operations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Will contain JWT Token given to the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"<JWT Token here>\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "Delete_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username to be deleted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for the corressponding username.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/deleteUser.js",
    "groupTitle": "User_Operations"
  },
  {
    "type": "get",
    "url": "localhost:3000/mad/signin",
    "title": "Sign in",
    "description": "<p>Used to sign in a user to the server</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SignInError",
            "description": "<p>There was an error during sign in.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SignInError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"usernameExistsPassed\": true\n  \"credentialsPassed\": false\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n'localhost:3000/mad/signin?\nusername=bennyhawk\npassword=password123'",
        "type": "curl"
      }
    ],
    "group": "User_Operations",
    "name": "Sign_In",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user wanting to sign in</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password corresponding to the username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Gives access token to be placed in the Authorization header for further requests</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n  \"token\" : <JWT Token>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/signIn.js",
    "groupTitle": "User_Operations"
  },
  {
    "type": "get",
    "url": "localhost:3000/mad/sync",
    "title": "Sync user details",
    "description": "<p>Used to sync user details from the server</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SyncError",
            "description": "<p>There was an error during sync.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SyncError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"usernameExistsPassed\": true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n-H 'Authorization: <JWT token here>'\n'localhost:3000/sync?\nusername=bennyhawk'",
        "type": "curl"
      }
    ],
    "group": "User_Operations",
    "name": "Sync",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of the user wanting to sign in</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n  \"username\" : <String>\n  \"password\" : <String>\n  \"accounttype\" <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/sync.js",
    "groupTitle": "User_Operations"
  },
  {
    "type": "get",
    "url": "localhost:3000/updateUser",
    "title": "Update a user",
    "description": "<p>Used to update user details from the database</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UpdateUserError",
            "description": "<p>There was an error during updating the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "DeleteUserError",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false\n  \"usernameExistsPassed\": true\n  \"credentialsPassed\": false\n  \"updateSuccessful\": false\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET\n-H 'Authorization: <JWT token here>'\n'localhost:3000/updateUser?\nusername=bennyhawk\npassword=password\nnewusername=bennyhawk123\nnewpassword=password123\nnewage=20'",
        "type": "curl"
      }
    ],
    "group": "User_Operations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Will contain JWT Token given to the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"<JWT Token here>\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "Update_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Mandatory username needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory password needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "newusername",
            "description": "<p>Optional new username if update needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "newpassword",
            "description": "<p>Optional new password if update needed</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "newage",
            "description": "<p>Optional new age if update needed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"bennyhawk\"\n  \"password\": \"password\"\n  \"newusername\": \"bennyhawk123\"\n  \"newpassword\": \"password123\"\n  \"newage\": \"20\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates result of operation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "DRONAID_API/routes/updateUser.js",
    "groupTitle": "User_Operations"
  }
] });
