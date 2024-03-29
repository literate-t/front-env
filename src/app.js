import axios from 'axios';
import './app.css';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios.get('/api/users');
  console.log(res);

  document.body.innerHTML = (res.data || [])
    .map((user) => `<div>${user.id}: ${user.name}</div>`)
    .join('');
});

console.log('a');

// console.log(process.env.NODE_ENV);
// console.log(TWO);
// console.log(two);
// console.log(api.domain);
