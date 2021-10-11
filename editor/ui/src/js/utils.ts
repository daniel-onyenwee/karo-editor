const jq:any = Object(window)["$"]

/**
 * function to handle ajax request
 * @param method request method
 * @param url request url
 * @param onSuccess callback function call when request is successful
 * @param onError callback function call when request failed
 */
 const axel = (method:"POST"|"GET", url:string, onSuccess:((data:any) => void) = (data:any) => {}, onError:(() => void) = () => {}): void => {
    jq.ajax({
        type: method,
        url: url,
        async: true,
        success: onSuccess,
        error: onError
    })
}