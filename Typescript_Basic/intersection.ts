interface Equipment {
    id: string;
    name: string;
    price: number;
  }
  
  interface Weapon extends Equipment {
    attack: number;
  }
  
  interface Armor extends Equipment {
    defence: number;
  }
  
  function printEquipment(equipment: Weapon & Armor) {
    console.log(`이름: ${equipment.name}`);
    console.log(`이 장비는 공격력을 ${equipment.attack}, 방어력을 ${equipment.defence} 증가 시킵니다.`);
  }
  
  const item1: Weapon & Armor = {
    id: 'g001',
    name: '서리불꽃 글러브',
    price: 100,
    attack: 5,
    defence: 42,
  };
  
  printEquipment(item1);

  // intersection example
  interface A {
    a: string;
  }
  
  interface B {
    b: number;
  }
  
  function printAIntersectionB(arg: A & B) {
    console.log(arg.a);
    console.log(arg.b);
  }
  
  const x = { a: 'codeit' };
  const y = { b: 42 };
  const z = { a: 'codeit', b: 42 };
  const w = { a: 'codeit', b: 42, c: true };
  
  printAIntersectionB(x); // 타입 오류
  printAIntersectionB(y); // 타입 오류
  printAIntersectionB(z);
  printAIntersectionB(w);
  
  