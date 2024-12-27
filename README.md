# TABA_SW_O/S이론 2024/12/23~
## Chapter 6 : Synchoronization Tools
### critical section(p.130)
- critical section : 수백개의 프로세스가 CPU에 진입할 때 들어갈 때의 값과 나올 때의 값이 다른 경우가 생기는 경우를 critical section이라 한다.
- solution : locking시스템을 사용. 수백개의 프로세스 중에 단 하나의 프로세스만 critical section에 들어갈 수 있음. 이곳에 프로세스가 진입하면 locked되고 다른 프로세스는 waiting.<br>
<code>do(
    acquire lock
        critical section
    release lock
        reminder seection
) while (true);</code>
- solution using test_and_set() instruction : locked와 false를 사용<br>
<code>do(
while(test_and_set(&locked))
    /*critical section*/
lock = false;
    /*reminder section*/
) while (true)</code><br>
- semaphore : 0과1로 실행 순서를 정하는 것. process1(p1)이 실행되면 1이 되고 p2는 wait(synch). p1이 완료되면 signal를 주고 p2가 실행됨. 이 과정을 binary semaphore라고 한다.

## Chapter 7 : synchoronization Example
### producer-consumer problem(p.144)
- 생산자와 소비자가 메모리 버퍼에서 데이터를 넣고 빼올때 동시에 일어나지 않도록 하기 위함.<br>
- semaphore full=0, empty=n, mutex=1로 두고 producer에서 critcal section에 들어갈 때 mutex=1로 두어 단독으로 처리. 처리되면 wait에 signal을 주어 full=0으로 바꿔주고 다음 데이터를 critical section에 넣는 동작 반복.
### readers-writers problem
- mutex = 1, rw_mutex=1, read_count=0. write와 read를 동시에 할 수 없도록함. BUT starvation문제는 해결하지 못함.(우선순위가 계속 밀리는 현상.예를 들어 reader에 계속 데이터가 들어가면 read_count가 계속 증가하여 writer 조건이 만족하지못하여 writer권한이 생기지 않음.)
- starvation : 우선순위가 계속 밀려 뒷 프로세스가 굶어죽는것
- deadlock : 일어나지 않을 조건을 프로세스가 계속 기다리는 것
- livelock : 무한 굴레의 조건을 프로세스가 계속 도는 것

## Chapter 8 : Deadlock(p.150)
- 정의 : 자원1은 쓰레드1에게 할당되고, 쓰레드1은 자원2를 기다린다. 자원2는 쓰레드2에 할당되고 쓰레드2는 자원1을 기다린다. 즉 서로가 서로를 기다리는 교착상태가 일어난다. 이것이 deadlock.
- deadlock 특징 : 1. 상호배제 mutual exclusion - 하나의 쓰레드는 하나의 자원만 보유할 수 있음 2. 보유 및 대기 3. 비선점 - 이미 자원을 가진 쓰레드가 자발적으로 자원을 내놓지 않는 한 그 자원을 강제로 뺏을 수 없다. 4. 환영대기 - 여러개의 쓰레드가 서로의 자원을 기다리는 상태
### basic fact
- graph contains no cycles - no deadlock
- contains cycles - only one instance per resource type, then deadlock
### method for handling deadlock
1. Prevention - 아래deadlock의 필요조건 하나만 불만족하게 만들면 된다.
- 상호배제 : 공유자원이 아닌 비공유자원만 가지게 한다.
- 보유 및 대기 : 자원을 요청하는 쓰레드에게 앞으로 사용할 자원 전체를 한꺼번에 미리 할당받게 한다.
- 비선점 : 자원이 즉시 할당될 수 없게 되면, 현재까지 보유한 모든 자원을 해제한다.
- 환영대기 : 모든 자원들에 대해 순서를 매긴다. 요청되는 순서 정한다. 자원들이 순서대로 요청되게 한다. 예를 들어 2개의 공유자원에 대해서 할당순서를 매겨서 first_mutex,second_mutex로 처리한다. 


## Chapter 11 : mass-storage systems 대용량 저장 장치(p.220)
processor : 능동적인 개체
### hdd, ssd(nonvolatile memory_NVM), dram, sram : 저장장치
- HDD Scheduling : 디스크의 성능 좌우 요소 - seek time, rotational delay, 전송시간
- track을 찾는 seek time을 줄이는 것이 스케쥴링의 핵심
- HOW Minimize seek time? : minimize seek distance - 헤더의 이동거리를 줄인다.
- 헤더의 이동거리를 줄이는 스케줄링 : 현재 헤더의 위치, 요청된 데이터의 위치
- EX) queue : 98, 183, 37, 122, 14, 124, 67, 현재 헤더위치 53
1. FCFS : 공평하다. but 비효율적
2. SSTF : shortest seek time first - 현재 헤더의 위치에서 가까운 것부터 처리한다.
3. SCAN : 엘레베이터 알고리즘. 헤더의 위치와 이동방향을 동시에 고려. but 0이라는 요청이 없어도 0까지 간다.
4. cSCAN : 방향을 정하면 끝까지 간다.
### NVM and HDD
- nvm이 일반적으로 속도가 빠르다. 어떤 때에는 hdd와 nvm의 처리율이 비슷할 때도 있다.
- nvm은 덮어쓸때 처리속도가 느리다. 블록단위로 전체를 지우고 다시 써야하기 때문이다. 또한 특정 블록만 계속 erease가 일어나면 수명이 금방 줄어든다. 
### Error detection
- parity - 짝홀수checksum. 예를 들어 8bit짜리 데이터를 전송해야하는데 1을 짝수개만 나오도록 protocol을 만들어 오류를 탐지한다. 1010 010* 이면 *=1을 넣어 checksum
### storage device management
- low level formatting, logical formatting or making a file system(ntfs,fat32,ext)
- root partition을 통해 os,fs,raw data를 저장

## Chapter 13 : file system interface
- 파일이란 - contiguous logical address space
- 파일 속성 : name, type, identifier, size, protection
