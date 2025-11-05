

// 4 hàm ( 1 middleware , 1 login , 1 ko cần auth , 1 auth)

// khai báo port
const app = require("./src/app");


// gõ : node server.js //node --watch server.js
const port = 3056;
const server = app.listen(port ,()=>{
    console.log(`WSV ecommerce port ${port}`)
})
