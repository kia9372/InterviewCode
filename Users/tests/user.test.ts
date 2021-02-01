import unitOfWork from '../src/DataLayer/Repository/UnitOfWork/UnitOfWork';

const mongoose = require('mongoose');
const should = require('chai').should();
const assert = require('assert');
var expect    = require("chai").expect;


describe("User Test", () => {

    it("Create USer", async function(done){

        let result = await unitOfWork.UserRepository.CreateUser({
            firstName: "Kianoush",
            lastName: "Dortaj",
            phoneNumber: "kiadr9372@gmail.com",
            gender: 1,
            password: "123456"
        })

        expect(result.success).to.equal(true);
        done();
    })

})