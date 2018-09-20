import * as Restify from "restify"
import * as Crypto from "crypto"

export class SignatureMiddleware {
    /**
     * Signing secret
     */
    private secret: string

    constructor(secret: string) {
        this.secret = secret
    }

    /**
     * Verify the signature for all POST requests
     * 
     * @param req Restify Request object
     * @param res Restify Response object
     * @param next Restify Next function
     */
    public handleRequest(req: Restify.Request, res: Restify.Response, next: Restify.Next) {
        if (req.method != 'POST') {
            next()
            return
        }

        let signature = req.header('X-Signature')
        let body = req.body

        if (this.verifySignature(signature, body)) {
            next()
            return
        }

        res.send(401)
    }

    /**
     * Sign a given content and check if its match with a given signature
     * 
     * @param signatureToVerify Given signature
     * @param bodyToSign Content to sign
     */
    private verifySignature(signatureToVerify: string, bodyToSign: string): boolean {
        let hmac = Crypto.createHmac("sha1", this.secret)
        let calculatedSignature = "sha1=" + hmac.update(JSON.stringify(bodyToSign)).digest("hex");

        if (calculatedSignature === signatureToVerify) {
            return true
        }

        return false
    }
}