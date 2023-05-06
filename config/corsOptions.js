

const whiteList = ['https://www.yoursite.com', 
'http://127.0.01:5500', 
'http://localhost:3000'];


const corsOptions = {
    origin: (origin, callback) =>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(newError('Not allowed By Cors'));
        }
        
    },
    optionsSucessStatus: 200
}

module.exports = corsOptions;