const coachesExists= (coaches) => {
    let checkExistsQuery= coaches.reduce((accu, currVal, index) => {
        if (index < coaches.length -1 ) {
            currVal= `${accu} EXISTS ( SELECT 1 FROM coaches WHERE personnel_id = ${currVal} ) AND `
        }
        else{
            currVal= `${accu} EXISTS ( SELECT 1 FROM coaches WHERE personnel_id = ${currVal} ))`
        }
        return currVal.toString()
    
    }, "SELECT (")
    return checkExistsQuery
}

function addteamCoaches(team_name, coaches){
    console.log("Entered into add team coaches")
    let query= coaches.reduce((accu, currVal, index) => {
        if (index < coaches.length -1 ) {
            currVal= `${accu} ('${team_name}', ${currVal}),`
        }
        else{
            currVal= `${accu} ('${team_name}', ${currVal}) ON CONFLICT ON CONSTRAINT team_coaches_pkey DO NOTHING RETURNING *`
        }
        return currVal.toString()
    
    }, "INSERT INTO team_coaches (team_name, coach_id) VALUES")
    return query
}

module.exports = {
    addteamCoaches,
    coachesExists

}