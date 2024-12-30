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
- file contents = text file, source file, executable file
### File Attributes
- 파일 속성 : name, type, identifier, size, protection
- 파일 속성은 file control block에 저장된다. 리눅스에서는 inode에 저장됨.
- inode를 저장하는 disk의 block과 userdata를 저장하는 block은 다르다. disk의 한블럭에는 4kbyt 저장가능. 예를들어 inode=256byt면 한개의 disk block에는 16개의 inode가 들어갈 수 있다. 데이터의 크기가 40kbyte면 데이터블럭이 10개 필요하다. 4mbyte면 1M=2^20 4M=2^22 4K=2^12이므로 2^10=1024개의 데이터블록이 필요하다. inode의 구조 = inode table은 inode number, link count, file type으로 분류되고, data pool에는 inode directory data가 들어있다. 여기에 file attributes가 들어있고 block1, 2,3..과 같이 들어있다. block의 갯수의 따라 이 파일의 크기를 짐작할 수 있다. 
### file operations
- create, write, reposition within file(seek-읽고쓰는 설정 변경), delete, truncate, open, close
- create API system call <br> <code>int fd = open("파일이름", O_CREAT\O_WRONLY\O_TRUNC,S_IRUSR\S_IWUSR)</code>
- 임의접근(random access) - 디스크에 대한 임의접근 <br> <code>off_t lseek(int filde,off_t offset,int whence);</code>
### file type
- ex) crw-r--r-- 중에 c가 file type에 해당한다. 뒤는 권한에 대한 내용을 3개로 나눠서 권한을 표시.
- file type : - regular file, b block file, d directory, c character, l symbolic link, p pipe, s socket
- permission bits : r read, w write, x execute, s setuid, t sticky bit

### disk structure
- 디스크는 분할로 나뉘어진다. 물리적으로 하나의 디스크를 partition A, b로 분할 가능. 이것이 좋은 이유는 한개의 디스크가 고장났을 때 대체할 수 있기 때문. 명령어 : mount, df, mkfs파일시스템생성
- 안전성 향성을 위해 RAID로 복구할 수 있도록 한다.
- 디스크의 첫 환경은 raw로 사용된다. 파일 시스템을 저장하는 것을 volume이라 한다.

### making file system<p.279>
1. 디스크 분할 생성 mkfs
2. 각 분할마다 fs생성 - 윈도우 : NTFS, 리눅스 - ext4<br> <code>sudo mkfs.ext4/dev/sdaS</code>
- 코드의미 : 리눅스환경에서 mkfs라는 시스템파일을 만드는데 root밑 dev에 sdas 하드디스크에 생성한다.
- Mount arguments : FStype, partiotion, mount point <br><code>$moint -t ext3/dev/mnt</code>

## Chapter 14 : file system implementation
### allocation method : contiguous allocation, linked alloctaion, indexed allocation
1. contiguous allocation 연속할당 : filename, start, length를 저장해 매핑, 예를 들어 count라는 파일의 start=0, length=2이면 디스크의 0번주소, 1번주소에 데이터가 연속적으로 할당된 것이다. 
- 단점 : 디스크사이에 6개의 공간이 있을때 7개이상의 데이터를 저장하고 싶을때 연속할당법은 할당하지 못한다. 또한 마지막 블록은 빈공간이 생길 가능성이 높다. 예를들어 한블럭당 512byte를 저장할 수 있는데 파일의 크기가 513byte라면 두번째 블록은 1byte만 사용하고 나머지는 비어있는 상태가 된다. 할당하기전에 파일사이즈를 미리 알고있어야 한다. external fragmentation
- 장점 : 임의접근이 쉽다. 찾고자하는 byte의 위치를 찾기가 쉽기 때문. 단순하고 가장 좋은 성능을 낸다.
2. linked allocation 연결할당 : start와 end지점을 정해놓고 각 블록이 끝날때마다 다음 블록을 표시한다.
- 장점 : 필요공간보다 더 많은 할당공간이 필요할 때의 연속할당의 문제점을 해결가능
- 단점 : 임의접근이 어렵다. 순차적인 접근의 속도가 느리다. disk seek time이 길다. 중간 블럭의 하나의 포인터를 잃어버리면, 다음 블록을 찾을 수 없다(블럭이 여기저기 흩어져있기 때문).
3. indexed allocation 색인할당 : filename, index block이 저장되어있다. index block안에 각 블럭 번호가 들어있다.
- 장점 : 연속할당과 연결할당의 단점을 보완하였다. 비어있는 공간을 줄인다. 임의접근이 좋은 편이다. 리눅스가 이 방법을 사용 중
- 단점 : 색인블록이 추가가 되고, 이 블록이 망가지면 파일을 찾을 수 없다. 리눅스에서도 inode의 일부가 이 데이터를 담고 있다.
### Free space management
- 파일 시스템에서 사용중인 블록이 어디가 사용되었고, 얼마나 사용되고 있는지 알아야한다. 이것을 bit vector or bit map이라 한다.
- 블럭이 100만개면, 100만개의 비트를 사용하여 1이면 free, 0이면 occupied. EX) block size= 4KB=2^12byte, disk size=2^40b=1TB이면, 필요 블럭개수 n=2^28bits=2^25B=32MB, 만약 하나의 클러스터를 4block으로 사용한다면, 8MB의 메모리가 필요하다.
### Efficiency and Performance
- cashe : sRam, 자주 접근되는 데이터를 미리 정보를 저장해두는 것. = buffer cashe

