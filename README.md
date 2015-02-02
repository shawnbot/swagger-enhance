# swagger-enhance

Enhance [Swagger] API metadata by expanding all of its API endpoints.

## Usage
Install it via [npm]:

```sh
npm install swagger-enhance
```

Then call `swagger-enhance` with a Swagger-compliant JSON URL, and it will produce "enhanced" JSON on `stdout`:

```sh
API_URL=http://petstore.swagger.wordnik.com/api/api-docs
swagger-enhance $API_URL > petstore.json
```

You can also pipe in JSON directly (either via filename or stdin) and provide a base URL from which to get endpoint metadata:

```sh
API_URL=http://petstore.swagger.wordnik.com/api/api-docs
curl $API_URL > petstore.json
swagger-enhance --file --base $API_URL > petstore-enhanced.json
```

Full usage:

```
Usage: swagger-enhance [--file --base <url>] [--pretty] [input] [output]

Options:
  --file        Parse the input as a filename, rather than a URL
  --base        set the base URL for file input                 
  -p, --pretty  Output JSON prettily                            
```

If no `output` filename is provided, the output is printed to stdout, so you can pipe it to other programs.
If no `input` URL or filename is provided, the input is assumed to be come from stdin.

[Swagger]: http://swagger.io
[npm]: https://www.npmjs.com/package/swagger-enhance
