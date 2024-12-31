# 데이터베이스와 SQL이론
## Chapter 1 : databases and database users
### Basic Definitions
- database : related data의 집합
- data : known facts.
- mini-world : 실제 세계의 일부만 떼와서 데이터를 한정시킨 것.
- DBMS : software package/ system to facilitate the creation and database
- database system : dbms software. 때로는 애플리케이션에도 포함되어 있다. - database는 아니다.
- noSQL 개발엔진은 빅데이터 기업들이 대용량 transaction을 처리하기 위해 개별적으로 개발한 database이다. eventual consistancy

### simplified DB system environment
1. DATABASE - db는 disk속에 stored db definition과 stored db로 구성되어있다. definition에는 meta data = schema 가 들어있다. - self discribe라고도 한다.
2. DBMS software - query process 처리. sql문을 처리한다. QP라고 한다.
3. DATABASE system - query문들을 저장. 애플리케이션 program들이 들어가있다.

### DBMS 기능
- 정의 - 조작 - 제어
- define database(type,structure,constraints), manipulating database(insert,delete,modify), all data vaild and consistant

### application activities
- 애플리케이션은 데이터베이스와 상호작용한다.
- Query, Transactions : read,update,generate new data and store. 트렌젝션이 모여 에플리케이션이 작동한다, Authorized access data, changing user requirements
- meta data : 데이터베이스의 description을 저장하는 것이 meta data라고 하고 스키마라고도 불린다.

### 데이터베이스 장점
1. 데이터의 중복을 방지한다. 데이터의 일관성을 유지한다.
2. restricting unauthorized access to data. 권한 부여
3. persistent storage = DBMS, index와 같은 query processing을 제공한다.

### implication of using the database approach
1. 표준standard meta data를 제공해야한다. 

## Chapter 2 : database system architecture
### data models
- schemas vs instance : 스키마 - 데이터베이스에 대한 구조를 기술한 것. 데이터 타입과 제약조건 및 구조를 포함한다. 스키마 다이어그램 - 그림으로 스키마를 표현한 것.
- database state : 특정 시간에 저장된 데이터들. 새로운 정보가 들어오면 state는 변경된다. 하지만 무결성은 유지되어야 한다. 항상 database state는 vaild & correct해야 한다.
- data value는 real world가 변화함에 따라 변하지만, schema는 변경이 거의 일어나지 않아야 한다.
### dbms의 궁극적 목적
- 논리적 데이터 독립성 : 개념적 스키마가 변화해도 그 상위 개념의 스키마가 변형되지 않는 것
- 물리적 데이터 독립성 : 내부 스키마가 개념적 스키마에 의해 변형되지 않는 것
- 즉 아래 단위의 스키마의 변화에 상위 스키마가 변형되지 않는 데이터의 독립성을 유지하는 것이 DBMS의 목적이다.

### 데이터 언어
1. DDL 데이터 정의어 : 테이블 선언, 물리 스키마 정의, storage definition
2. DML 데이터 조작어 : select,insert,update,delete - c or java 등에 삽입할 수 있다.
3. DCL 데이터 제어어 : 공용 데이터베이스 관리를 위해 데이터 제어, 권한 부여, 무결성, recovery등의 내용

### database system utilities
- 데이터 이동 도구를 이용하여 데이터를 파일로 묶어서 저장한다.
- 주기적으로 데이터베이스를 백업한다.
- 데이터베이스 파일구조를 재구조화 한다.
