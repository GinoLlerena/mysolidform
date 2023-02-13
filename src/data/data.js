export const data = {
  "formId": "14779320789550015k4v",
  "name": "My Custom Dynamic Form",
  "formElements": [
    {
      "displayName": "My Dynamic Form",
      "displayOrder": 0,
      "required": false,
      "elementId": "printElement",
      "type": "print",
      "readOnly": false,
    }, {
      "displayName": "First Name",
      "displayOrder": 1,
      "required": false,
      "elementId": "firstname",
      "type": "text",
      "readOnly": false,
      "isHidden": () => (false)
    }, {
      "displayName": "Last Name",
      "displayOrder": 2,
      "required": false,
      "elementId": "lastname",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Company",
      "displayOrder": 3,
      "required": false,
      "elementId": "standardCompanyname",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Job Title",
      "displayOrder": 4,
      "required": false,
      "elementId": "jobtitle",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Gender",
      "displayOrder": 5,
      "required": false,
      "elementId": "gender",
      "formElementValues": [{
        "displayName": "Male",
        "displayOrder": 1,
        "elementvalueId": "male"
      }, {
        "displayName": "Female",
        "displayOrder": 2,
        "elementvalueId": "female"
      }],
      "type": "simple-select",
      "readOnly": false,
      "isHidden": ()=>(false)
    },
    {
      "displayName": "Sales Rep First Name",
      "displayOrder": 6,
      "required": false,
      "elementId": "salesPersonFirstName",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Sales Rep Last Name",
      "displayOrder": 7,
      "required": false,
      "elementId": "salesPersonLastName",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Sales Rep Email",
      "displayOrder": 8,
      "required": false,
      "elementId": "salesPersonEmail",
      "type": "text",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Status",
      "displayOrder": 9,
      "required": false,
      "elementId": "status",
      "formElementValues": [{
        "displayName": "Approved",
        "displayOrder": 1,
        "elementvalueId": "approved"
      }, {
        "displayName": "Declined",
        "displayOrder": 2,
        "elementvalueId": "declined"
      }, {
        "displayName": "Pending",
        "displayOrder": 3,
        "elementvalueId": "pending"
      }],
      "type": "radio",
      "readOnly": false,
      "isHidden": ()=>(false)
    }, {
      "displayName": "Registered?",
      "displayOrder": 10,
      "required": false,
      "elementId": "registered",
      "type": "checkbox",
      "readOnly": false,
      "isHidden": false
    }, {
      "displayName": "Comments",
      "displayOrder": 11,
      "required": false,
      "elementId": "comments",
      "type": "textarea",
      "readOnly": false,
      "isHidden": ['registered']
    },
    {
      "displayName": "Relatives",
      "displayOrder": 12,
      "required": false,
      "elementId": "relatives",
      "type": "listelement",
      "readOnly": false,
      "hiddenAdd": false,
      "internalForm": [
        {
          "displayName": "First Name",
          "displayOrder": 1,
          "required": false,
          "elementId": "firstName",
          "type": "text",
          "readOnly": false,
        }, {
          "displayName": "Last Name",
          "displayOrder": 2,
          "required": false,
          "elementId": "lastName",
          "type": "text",
          "readOnly": false,
        },
        {
          "displayName": "Gender",
          "displayOrder": 3,
          "required": false,
          "elementId": "gender",
          "formElementValues": [{
            "displayName": "Male",
            "displayOrder": 1,
            "elementvalueId": "male"
          }, {
            "displayName": "Female",
            "displayOrder": 2,
            "elementvalueId": "female"
          }],
          "type": "simple-select",
          "readOnly": false,
        }
      ]
    }
    ]
}
