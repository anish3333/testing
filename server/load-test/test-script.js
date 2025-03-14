import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,  // Virtual users
  duration: '30s',  // Test duration
};

export default function () {
  // Base API URL
  const BASE_URL = 'http://localhost:3000';

  // 1️⃣ Test the root endpoint
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'Root endpoint status is 200': (r) => r.status === 200,
    'Response contains welcome message': (r) =>
      JSON.parse(r.body).message === 'Welcome to the API!',
  });

  // 2️⃣ Test the GET /users/:id endpoint
  res = http.get(`${BASE_URL}/users/123`);
  check(res, {
    'User endpoint status is 200': (r) => r.status === 200,
    'User ID is correct': (r) =>
      JSON.parse(r.body).userId === '123',
  });

  // 3️⃣ Test the POST /data endpoint
  const payload = JSON.stringify({ name: 'John Doe', age: 30 });
  const params = { headers: { 'Content-Type': 'application/json' } };
  res = http.post(`${BASE_URL}/data`, payload, params);
  check(res, {
    'POST /data status is 201': (r) => r.status === 201,
    'Response contains correct data': (r) =>
      JSON.parse(r.body).data.name === 'John Doe',
  });

  sleep(1); // Pause for 1 second between iterations
}
