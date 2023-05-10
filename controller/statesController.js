const State = require('../model/State')
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) {this.states = data}
};





const getAllStates = async(req, res)=>{
   const statesData = data.states;
   res.json(statesData);
   
    const funfact = await State.find();
   const result = [...statesData, funfact]
    res.status(201).json(result);
} /*
const getAllStates = async (req, res) => {
    const statesData = data.statesData;
    const contig = req.query.contig;
    for (stateRecord of statesData ) {
        const funfact = await StatesDB.findOne({stateCode: stateRecord.code}, 'funfacts').lean();
        if(funfact){
            stateRecord.funfacts = [];
            stateRecord.funfacts = stateRecord.funfacts.concat(funfact.funfacts);
        }
    }/*
const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);
}

const getAllStates = async (req, res)=>{
    
    const states = await State.find({})
    if (!states) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(states);

}
/*
const createNewState = (req,res)=>{
    const newState = {
        code: data.states[data.states.length - 1].code + 1 || 1,
        state: req.body.state,
        nickname: req.body.nickname
    }
    if(!newState.code || !newState.nickname){
        return res.send(400).json({'message': 'State and nickname are required'});
    }
}
*/
const createNewState = async (req,res)=>{
    if(!req?.body?.stateCode){
        return res.status(400).json({'Message': "State code is required"})
    }
    try{
        const result = await State.create({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts
        })
        res.status(201).json(result);
    } catch(err){
        console.error(err);
    }
    
}
/*
const updateState = (req,res)=>{
    const state = data.states.find(emp => emp.code === parseInt(req.body.code));
    if (!state) {
        return res.status(400).json({ "message": `state ID ${req.body.id} not found` });
    }
    if (req.body.code) state.code = req.body.code;
    if (req.body.nickname) state.nickname = req.body.nickname;
    const filteredArray = data.states.filter(emp => emp.code !== parseInt(req.body.code));
    const unsortedArray = [...filteredArray, state];
    data.setStates(unsortedArray.sort((a, b) => a.code > b.code ? 1 : a.code < b.code ? -1 : 0));
    res.json(data.states);

} */
const updateState =  async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter is required'})
    }
    const state = await State.findOne({_id: req.body.id}).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state Id matches ${req.body.id} was found` });
    }
    if (req.body?.code) state.code = req.body.code;
    if (req.body?.nickname) state.nickname = req.body.nickname;
    const result = await state.save();
    res.json(result);

}
/*
const DeleteState = (req,res)=>{
    const state = data.states.find(emp => emp.id === parseInt(req.body.id));
    if (!state) {
        return res.status(400).json({ "message": `State ID ${req.body.id} not found` });
    }
    const filteredArray = data.states.filter(emp => emp.id !== parseInt(req.body.id));
    data.setStates([...filteredArray]);
    res.json(data.states);
}
*/
const DeleteState = async (req,res)=>{
    if(!req?.body?.id) return res.status(400).json({'message': 'State Id Required'})
    const state = await State.findOne({_id: req.body.id}).exec();
    if (!state) {
        return res.status(400).json({ "message": `State ID ${req.body.id} not found` });
    }
    if(!state){
        return res.status(204).json({"message": `No state ID matches ${req.body.id}`});
    }
    const result = await employee.deleteOne({__id: req.body.id });
    res.json(result);
}

const getState = (req, res) => {
    const state = data.states.find(emp => emp.code === (req.params.code));
    if (!state) {
        return res.status(400).json({ "message": `Employee ID ${req.params.code} not found` });
    }
    res.json(state);
} /*
const getState = async (req,res)=>{
    if(!req?.params?.code) return res.status(400).json({'message': 'State Id required' })
   
    const state = await State.findOne({__id: req.params.code}).exec();
    if (!state) {
        return res.status(400).json({ "message": `State ID ${req.params.code} not found` });
    }
    res.json(state);
}
*/
module.exports = {
    getAllStates,
    createNewState,
    updateState,
    DeleteState,
    getState,
    
}