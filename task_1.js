const parserUser = new DOMParser();

const xmlUser = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const xmlDOM = parserUser.parseFromString(xmlUser, "text/xml");
//console.log(xmlDOM);

let result = [];
const studentNode = xmlDOM.querySelectorAll("student");
for (let i=0; i<studentNode.length; i++) {
  let listResult = {};    
  let list = `{
          name: '${studentNode[i].querySelector("first").textContent} ${studentNode[i].querySelector("second").textContent}',
          age: ${Number(studentNode[i].querySelector("age").textContent)},
          prof: '${studentNode[i].querySelector("prof").textContent}',
          lang: '${studentNode[i].querySelector("name").getAttribute('lang')}'      
      }`;
    listResult=list;
    result.push(listResult);
    
}
 console.log('list:', result)