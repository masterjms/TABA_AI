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


# if문법
#!/bin/bash
v1=$1
v2=$2
if [ $v1 -lt $v2 ]
then
        echo "v1 < v2"
elif [ $v1 -gt $v2 ]
then
        echo "v1 > v2"
else
        echo "v1 = v2"
fi


# case문법
# $변수 in 조건값) 수행문;; *)조건외 수행문 esac
case $1 in
        hi)
                echo hi
                ;;
        hello)
                echo hello
                ;;
        *)
esac


# for반복문
# for 변수 in 범위
for num in 1 2 3 4 5
do
        echo $num;
done

#for예시 - home경로의 모든 파일명을 가져온다.
for file in $HOME/*
do
        echo $file;
done

#for예시 - {시작..끝..증가값}
for num in {1..10..2}
do
        echo $num;
done # 1부터 2씩 증가하며 10까지 반복한다.

#for예시 - 배열
arr=("a","b","c")
for str in {arr[@]}
do
        echo $str;
done


#while문
n=1
while [ $n -lt 5 ]
do
    echo $n
    n=$((n+1))
done


#전체실습
echo "파일위치: $PWD"
for num in {1..100}
do
        echo "파일명 : TABA_7_file_$num.txt";
        echo "파일내용 : 이 파일은 TABA_7_file_$num.txt입니다.";
done