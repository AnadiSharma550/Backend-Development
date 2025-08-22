const o1=
{
    o2:
    {
        name: "Anadi",
        age: 19
    }
}

function f1() {
  return `My name is ${o1.o2.name}, age ${o1.o2.age}`;
}

module.exports = {
  o1,
  f1
};