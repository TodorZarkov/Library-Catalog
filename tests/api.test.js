const chai = require('chai');
const chaiHttp = require('chai-http');
let server = "http://localhost:3030" //require('../server/server');
if(process.env.TESTING_HOST){
    server = process.env.TESTING_HOST;
}
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book API', () => {
    let bookId;

    it('should GET all books', (done) => {
        chai.request(server)
            .get('/data/books')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('should return 404 when trying to GET, PUT or DELETE non-existing book', (done) => {
        let nonExistingBookId = "9999";
        const nonExistingBook = {
            id: nonExistingBookId,
            title: "Test Title",
            author: "Test Author"
        };

        chai.request(server)
        .get(`/data/books/${nonExistingBookId}`)
        .end((err,res) => {
            expect(res).to.have.status(404);
        });
        chai.request(server)
        .put(`/data/books/${nonExistingBookId}`)
        .end((err, res) => {
            expect(res).to.have.status(404);
        });
        chai.request(server)
        .delete(`/data/books/${nonExistingBookId}`)
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});