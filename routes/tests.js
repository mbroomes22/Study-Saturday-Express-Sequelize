const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
    try {
        const tests = await Test.findAll();
        res.send(tests);
    }
    catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const testId = await Test.findById(req.params.id)
        res.send(testId);
    }
    catch (error) {
        next(error)
    }
});

router.post('/student/:studentId', async (req, res, next) => {
    try {
        const {subject, grade} = req.body;
        const foundStudent = await Student.findById(req.params.studentId)
        let newTest = await Test.create({subject, grade});
        const setTest = await newTest.setStudent(foundStudent)
        res.status(201).json(setTest);
    }
    catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Test.destroy({where: {id: req.params.id}});
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
})


module.exports = router;
