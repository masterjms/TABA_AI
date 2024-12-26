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