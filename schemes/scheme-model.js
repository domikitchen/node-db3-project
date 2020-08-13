const db = require('../data/db-config.js');
const e = require('express');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
};

function findById(id) {
    return db('schemes').where({ id }).first();
};

function findSteps(id){
    return (db('steps')
        .join('schemes', 'steps.scheme_id', "=", 'schemes.id')
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ 'schemes.id': id })
        .orderBy('steps.step_number'));
};

function add(schemeData){
    return db('schemes').insert(schemeData).returning('id').then(ids => {
        return findById(ids[0]);
    });
};

function update(scheme, id){
    return db('schemes').where({ id }).update(scheme).then(() => {
        return findById(id);
    })
};

function remove(id){
    return db('schemes').where({ id }).del().then(id => {
        if(id){
            return "Successfully removed";
        }
        else{
            return null;
        }
    });
};