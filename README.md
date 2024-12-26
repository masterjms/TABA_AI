# TABA_SW_O/S이론
## Chapter 6 : Synchoronization Tools
### critical section(p.130)
- critical section : 수백개의 프로세스가 CPU에 진입할 때 들어갈 때의 값과 나올 때의 값이 다른 경우가 생기는 경우를 critical section이라 한다.
- solution : locking시스템을 사용. 수백개의 프로세스 중에 단 하나의 프로세스만 critical section에 들어갈 수 있음. 이곳에 프로세스가 진입하면 locked되고 다른 프로세스는 waiting.
<code> do(
    acquire lock
        critical section
    release lock
        reminder seection
) while (true);
</code>
- solution using test_and_set() instruction : locked와 false를 사용
<code>do(
    while(test_and_set(&locked))
        /*critical section*/
    lock = false;
        /*reminder section*/
) while (true)</code>
- semaphore : 0과1로 실행 순서를 정하는 것. process1(p1)이 실행되면 1이 되고 p2는 wait(synch). p1이 완료되면 signal를 주고 p2가 실행됨. 이 과정을 binary semaphore라고 한다.