import supertest from 'supertest'; 
import { should } from 'chai';
const request = supertest('https://gorest.co.in/public-api/'); 


const token = '' || process.env.ADMINTOKEN;


const randomNumberGenerator = max => {
    return Math.floor(Math.random() * max || 999) + 1;
}

describe('Users', () => { 
    it('GET /users', () => {
       return request
            .get(`users?access-token=${token}`).then((res) => {
              should().exist(res.body.data);
            });
    });
    it('GET /users/:id', () => {
        return request
             .get(`users/201?access-token=${token}`).then((res) => {
                res.body.data.id.should.equal(201);
             });
     });

     it('POST /users', () => {
        return request
             .post("users")
             .set('Authorization', `Bearer ${token}`)
             .send({
                 name: "Jackson Ville",
                 status: "Active",
                 gender: "Male",
                 email: "testJacoposh" + randomNumberGenerator(800) + "@testK" + randomNumberGenerator(800) + ".com"
             })
             .then((res, err) => {
                 res.body.code.should.equal(201);
             })
     });
     it('PUT /users/:id', () => {
        const data = {
            name: "Jacoposh " + randomNumberGenerator()
        }
        return request
             .put("users/201")
             .set('Authorization', `Bearer ${token}`)
             .send(data)
             .then((res) => {
                 res.body.code.should.equal(200);
             })
     });
     it('DELETE /users/:id', () => {
        return request
            .delete(`users/${randomNumberGenerator(100)}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                res.body.code.should.equal(204);
            })
     });

});