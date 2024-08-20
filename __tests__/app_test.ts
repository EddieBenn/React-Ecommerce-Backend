import request from "supertest";
import app from "../src/app"
import * as http from 'http';

const loginUser = {
    username:"eddybenn56",
    password:"password8"
}




let server: http.Server;

beforeAll(() => {
  // Start your server here
  server = http.createServer(app);
  server.listen(3030);
});

afterAll((done) => {
  // Close the server and perform any other cleanup
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

// Your test cases here


describe("User Onboarding", () => {
    it("Login Users", async () => {

   
     const res = await request(app).post("/api/users/login").send(loginUser)
     expect(res.status).toBe(200)



    });

    it("Login Users Message", async () => {
   
        const res = await request(app).post("/api/users/login").send(loginUser)

        expect(res.body.message).toBe("Login successful")
   
   
       });
  });
  

