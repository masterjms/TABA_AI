# TMAX TIBERO DBMS
## Window Tibero Studio2 설정과 Linux환경 설정
### 메뉴얼
https://technet.tmax.co.kr/upload/download/online/tibero/pver-20220224-000002/index.html
### Window환경
1. 테크넷에서 tibero 6 또는 7 다운로드 (6은 installer가 있다.)
2. 다운 후 데모 라이센스 발급
3. CMD를 관리자 권한으로 실행하여 <code>tbboot</code>, <code>tbsql sys/tibero@localhost:8629/tibero</code>
4. tibero studio 다운로드 후 ip, user, pwd등을 입력 후 접속. 기본 포트번호는 8629
### Linux환경 - Putty
1. 테크넷에서 tibero 다운로드 후 putty실행
2. winSCP를 이용해 압축파일 이동 및 license.xml파일 이동
3. 압축 풀고 .shell 파일 설정
### Tibero Studio와 Linux Tibero
- tibero studio는 GUI가 제공된 DBMS, 리눅스에서는 타이핑으로 DBMS이용

### 접속 식별자 abc 사용하여 접속하기
- tbdsn.tbr에서 추가해줘야함
- <code>vi $HB_HOME/client/config/tbsdn.tbr</code><br>
- 위에서 abc 식별자 추가
