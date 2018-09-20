# Home Station API
The repository contains the REST API for my home station, an Arduino project

## Sending data
The GET endpoints of this API are not protected with any authentication method. The POST endpoints however are protected. Each POST request must contain a `X-Signature` header. This header must contain a HMAC SHA1 hash of the post body, hashed with a secret. See the pseudocode below:

```js
let req = new Request('{}');
req.addHeader('X-Signature', hmac('sha1=' + req.body, 'secret1234'));

req.send();
```

After execution of this pseudocode the `X-Signature` header will contain the following value:
```
sha1=3c4df74b10dc2126bb46414e91382cfedb7c567f
```
Please note the `sha1` prefix, as indication which hashing method is used. Without this prefix the hash will not be accepted!