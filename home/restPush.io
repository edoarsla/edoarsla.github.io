curl -i https://demo.confighub.com/rest/push/ConfigHub/Demo \
     -H "Content-Type: application/json" \
     -X POST -d '
     {
        "changeComment": "Adding a new key and value",
        "enableKeyCreation": true,
        "data": [
          {
            "key": "server.ip",
            "values": [
              {
                "context": "Development;*",
                "value": "1.1.1.1"
              }
            ]
          },
          {
            "key": "install.path",
            "values": [
              {
                "context": "Development;HelloWorld",
                "value": "/usr/app/helloWorld"
              }
            ]
          }
        ]
       }'