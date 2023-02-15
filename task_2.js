const jsonUser = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const data = JSON.parse(jsonUser);
const user = data.list;

const list = [
{
  name: user[0].name,
  age: Number(user[0].age),
  prof: user[0].prof,
},
{
  name: user[1].name,
  age: Number(user[1].age),
  prof: user[1].prof,
}
];
console.log('list', list);