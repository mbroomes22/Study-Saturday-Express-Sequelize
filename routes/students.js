const router = require('express').Router();
const Students = require("../db/models/student")

router.get('/', async (req, res, next) => {
  try {
    const allStudents= await Students.findAll();

    //.json === .send, but converted to json format
    res.status(200).json(allStudents);
  }
  catch (error) { 
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const foundStudent = await Students.findById(id);

        if (foundStudent) {
            res.status(200).json(foundStudent);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log()
        const newStudent = await Students.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        res.status(201).json(newStudent);
    }
    catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const studentToBeUpdated = await Students.findById(id);

        const updatedStudent = await studentToBeUpdated.update({
            firstName: req.body.firstName
        })

        res.status(200).json(updatedStudent);
    }
    catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const studentToBeDeleted = await Students.findById(id);

        const deletedStudent = studentToBeDeleted.destroy();

        res.status(204).json(deletedStudent);
    }
    catch (error) {
        next(error);
    }
})

module.exports = router;

