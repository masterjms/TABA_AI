//Literal(리터럴)은 프로그래밍에서 값 그 자체를 직접적으로 표현한 것을 의미합니다. 
//즉, 변수를 사용하거나 어떤 계산을 거치지 않고, 코드에 직접 적혀 있는 값이다.
let producted; // let은 리터럴 타입을 지정할 수 없다.

 // const는 한번 선언한 변수의 값이 변하지 않으므로 타입 선언을 할 필요없다.
 // 뒤에 나오는 값으로 타입을 추론한다. 
const passioned = "하이요"; // 문자형 리터럴타입

// ex
let small = 95;
const large = 100;
function printSize(size: 100){
    console.log(`사이즈는 ${size}입니다.`)
}
// 이때 small은 오류, large는 제대로 나온다.