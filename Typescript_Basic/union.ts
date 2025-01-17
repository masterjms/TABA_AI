enum ClothingSize {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
  }
  
  interface Product {
    id: string;
    name: string;
    price: number;
    membersOnly?: boolean;
  }
  
  interface ClothingProduct extends Product {
    sizes: ClothingSize[]; // sizes가 clothingproduct에도 있고, shoeprodcut에도 타입이 선언되어있다.
    color: string;
  }
  
  interface ShoeProduct extends Product {
    sizes: number[]; 
    handmade: boolean;
  }

  // 오류발생 - sizes
  function printSize(product: Product) { // Product에서 사이즈를 가져오고 싶은데 clothing, shoe 두개가 있다.
    const availableSizes = product.sizes.join(', '); // sizes의 타입이 충돌한다.
    console.log(`구매 가능한 사이즈는 다음과 같습니다: ${availableSizes}`);
  }
  // solution
  function printSizes(product: ClothingProduct | ShoeProduct) { // 이것이 union이다.
    const availableSizes = product.sizes.join(', '); 
    console.log(`구매 가능한 사이즈는 다음과 같습니다: ${availableSizes}`);
  }
  
  const product1: ClothingProduct = {
    id: 'c001',
    name: '코드잇 블랙 후드 집업',
    price: 129000,
    membersOnly: true,
    sizes: [ClothingSize.M, ClothingSize.L],
    color: 'black',
  };
  
  const product2: ShoeProduct = {
    id: 's001',
    name: '코드잇 스니커즈',
    price: 69000,
    membersOnly: false,
    sizes: [220, 230, 240, 260, 280],
    handmade: false,
  };
  
  printSizes(product1);
  printSizes(product2);