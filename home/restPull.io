curl -i https://demo.confighub.com/rest/pull/ConfigHub/Demo \
     -H "Context: Production;HelloWorld" \
     -H "Pretty: true"


HTTP/1.1 200 OK
{
  "generatedOn": "06/10/2016 22:38:13",
  "account": "ConfigHub",
  "repo": "Demo",
  "context": "Production;HelloWorld",
  "files": {
    "demo.props": "
        dbUrl: jdbc:mysql://prod.mydomain.com:3306/ProdDatabase\n
        dbUser: admin\n
        dbPass: prod-password"
  },
  "properties": {
    "db.host": {
      "val": "prod.mydomain.com"
    },
    "server.http.port": {
      "val": "80"
    },
    "db.name": {
      "val": "ProdDatabase"
    },
    "db.user": {
      "val": "admin"
    }
  }
}