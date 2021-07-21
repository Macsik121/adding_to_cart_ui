export default function template(body) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Graphics Card store</title>
            </head>
            <body>
                <div id="content">${body}</div>

                <script src="/vendor.bundle.js"></script>
                <script src="/app.bundle.js"></script>
            </body>
        </html>
    `
}