# ${변수:=문자열} : 변수가 설정되어 있지 않거나 null이면 문자열로 치환한다.
#!/bin/bash
var1="Taba1"
var2=""

echo "print var1 : $var1"
echo "print var2 : $var2"

echo ""
echo "print var1 : ${var1:=Taba test}"
echo "print var2 : ${var2:=hello test}"

# 2번째 예제
#!/bin/bash
var1=$1
var2=$2
echo "username : ${var1:=Guest}"
echo "greeting : ${var2:=welcome}" # 입력값이 없으면 guest와 welcome을 출력한다.

#오류시 메세지 ${변수:?에러메세지}
#!/bin/bash
str1="str1"
str2=""
error_msg="sorry"
echo ${str1:?$error_msg}
echo ${str2:?$error_msg}
