let ListData = [
    {id: 1, name: 'Kitty01', status: 'available'},
    {id: 2, name: 'Kitty02', status: 'available'},
    {id: 3, name: 'Kitty03', status: 'available'},
    {id: 4, name: 'Kitty04', status: 'available'},
    {id: 5, name: 'Kitty05', status: 'available'}
];
module.exports.find = (callback) => {
    callback(null, ListData);
};
module.exports.findById = (id, callback) => {
    callback(null, ListData.find(item => item.id == id)); // typeof id === "string"
};
module.exports.save = (pet, callback) => {
    if (!name || !status) {
        callback({message: "Pet is invalid!"});
        return;
    }

    ListData.push(pet);
    callback(null, pet);
};
module.exports.delete = (id, callback) => {
    let roweffected = ListData.length;
    ListData = ListData.filter(item => item.id != id);
    roweffected = roweffected - ListData.length;
    callback(null, {roweffected})
};
module.exports.update = (id, pet, callback) => {
    let oldPet = ListData.find(item => item.id == id);
    if (!oldPet) {
        mess = {
            "status": false,
            "message": "Pet not found!"
        };
        callback(mess);
        return;
    }
    if (pet.id != id) {
        mess = {
            "status": false,
            "message": "id not the same"
        };
        callback(mess);
        return;
    }
    let index = ListData.indexOf(oldPet);
    Object.assign(oldPet, pet);
    ListData.fill(oldPet, index, ++index);
    callback(null, oldPet);
};
