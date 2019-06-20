let Pet = require("../model/pet");

let lengthPets;

/*
 * GET /pets route to retrieve all the pets.
 */
let getPets = (req, res) => {
    Pet.find((err, pets) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(pets);
    });
};

/*
 * POST /pets to save a new pet.
 */
let postPet = (req, res) => {
    let pet = req.body;
    let id = parseInt(req.body.id);
    if (isNaN(id)) {
        msg = {
            "status": false,
            "msg" : "id must be a number"
        }
        res.send(msg)
        return
    }
    //if (req.body.id)

    Pet.find((err, pets) => {
        if (err) {
            res.send(err);
            return;
        }
        console.log(pets.length)
        if (pets.length >= 10) {
            msg = {
                "status": false,
                "msg" : "The number of pets should be less than or equal 10"
            }
            res.send(msg)
            return
        }
    });

    Pet.findById(req.body.id, (err, pet) => {
        if (pet != null) {
            message_err = "id exists";
            msg = {
                "status": false,
                "msg" : message_err
            }
            res.send(msg);
            return;
        }
    })
    Pet.save(pet, (err, newPet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Pet successfully added!",
            pet: newPet
        });
    });
};

/*
 * GET /pets/:id route to retrieve the pet with given id
 */
let getPet = (req, res) => {
    Pet.findById(req.params.id, (pet, err) => {
        if(err) {
            res.send(err);
            return;
        }
        if (pet == null) {
            message_err = "pet not found";
            msg = {
                "status": false,
                "msg" : message_err
            }
            res.send(msg);
            return;
        }
        res.send({
            pet
        });
    })
};

/*
 * DELETE /pets/:id to delete the pet with given id
 */
let deletePet = (req, res) => {
    Pet.delete(req.params.id, (err, result) => {
        if (result.roweffected == 0) {
            message_err = "pet not found, delete error";
            msg = {
                "status": false,
                "msg" : message_err
            }
            res.send(msg);
            return;
        }
        res.json({
            message: "Pet successfully deleted!",
            result
        });
    })
};

/*
 * PUT /pets/:id to update the pet with given id
 */
let updatePet = (req, res) => {
    Pet.update(req.params.id, req.body, (err, pet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Pet updated!",
            pet
        });
    })
};

//export all the functions
module.exports = {
    getPets,
    postPet,
    getPet,
    deletePet,
    updatePet
};
