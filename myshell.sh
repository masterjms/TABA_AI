# fork
# fork를 하게되면 child process가 생긴다. 여기에서 코드 text가 저장되는 text는 parent task와 child task는 공유된다. 하지만 전역변수가 저장된 data와 지역변수가 선언된 stack은 메모리의 다른 공간에 저장된다.

#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
int glob = 6;

int main()
{
        int var = 88; pid_t fork_return;

        printf("hello, pid = %d\n",getpid());
        printf("before fork\n");

        if ((fork_return = fork()) < 0 ) {
                perror("fork error");
                exit(1);
        } else if ( fork_return == 0 ) {
                glob++; var++;
                printf("child: pid = %d, ppid = %d\n",getpid(), getppid());
        } else {
                wait(NULL); sleep(1);
                printf("parent: i create child with pid = %d\n", fork_return);
        }

        printf("pid=%d, glob=%d, var=%d\n",getpid(),glob,var);
        printf("bye pid is %d\n",getpid());
}

#execvp()

#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
        pid_t fork_return, d_pid;
        int exit_status = -1;
        if ((fork_return = fork()) == -1){
                perror("error");
                exit(0);
        }
        else if (fork_return == 0 )
        {
                char *args[] = {"./hello", NULL};
                execvp(args[0], args);
                printf("child.. im here\n");
                exit(1);
        }
        else
        {
                d_pid = wait( &exit_status );
                printf("parent.. im here\n");
                printf("exit status of task %d is %d\n", d_pid, exit_status);
        }
}


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#define MAX_BUF 1024

int main(void)
{
        char line[MAX_BUF];
        char currentDir[MAX_BUF];

        while(1){
                if(getcwd(currentDir, sizeof(currentDir)) == NULL) {
                        perror("getcwd() error");
                        return 0;
                }

                printf("%s $", currentDir);
                fgets( line, sizeof(line) - 1, stdin);
                if(run(line) == false)
                        break;
        }
        return 0;
}
bool run(char* line) {
        char delims[] = "/r/n/t";
        char* tokens[128];
        int token_count;
        int i; int status; pid_t child;

        token_count = 2;
        tokens[0] = "ls";
        tokens[1] = "-al";
        tokens[2] = NULL;

        child = fork();
        if(child < 0) {
                printf("falied to fork()");
                _exit(0);
        }
        if (child == 0) {
                execvp();
                _exit(0);
        } else {

        }
        return true;
}


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#define MAX_BUF 1024

int main(void)
{
        char line[MAX_BUF];
        char currentDir[MAX_BUF];

        while(1){
                if(getcwd(currentDir, sizeof(currentDir)) == NULL) {
                        perror("getcwd() error");
                        return 0;
                }

                printf("%s $", currentDir);
                fgets( line, sizeof(line) - 1, stdin);
                if(run(line) == false)
                        break;
        }
        return 0;
}

bool run(char* line) {
        char delims[] = "/r/n/t";
        char* tokens[128];
        int token_count;
        int i; int status; pid_t child;

        token_count = 2;
        tokens[0] = "ls";
        tokens[1] = "-al";
        tokens[2] = NULL;

        child = fork();
        if(child < 0) {
                printf("falied to fork()");
                _exit(0);
        }
        if (child == 0) {
                execvp(tokens[0], tokens);
                _exit(0);
        } else {
                wait(0);
        }
        return true;
}

#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#define MAX_PATH 1024

int main(void)
{
	char line[MAX_PATH];
    char currentDir[MAX_PATH];

	while(1){
        if (getcwd(currentDir, sizeof(currentDir)) == NULL) {
            perror("getcwd() error");
            return 0;
        }

		printf("%s $", currentDir);     // Hint. Where are you?
		fgets( line, sizeof(line) - 1, stdin);
		if(run(line) == -1)
			break;
	}
	return 0;
}

int tokenize(char* buf, char* delims, char* tokens[], int maxTokens) 
{
    int token_count = 0;
    char* token = strtok(buf, delims);
    while (token != NULL && token_count < maxTokens) {
        tokens[token_count] = token;
        token_count++;
        token = strtok(NULL, delims);
    }
    tokens[token_count] = NULL;
    return token_count;
    }

int run(char* line) 
{
    char delims[] = " \r\n\t";
    char* tokens[128];
    int token_count;
    int i;
    int status;
    pid_t child;
    int built_in = 1;

    token_count = tokenize(line, delims, tokens, sizeof(tokens) / sizeof(char*));

    if (token_count == 0)
        return 1;

	// Run process
    child = fork();
	if (child < 0){
		printf("Failed to fork()!");
		_exit(0);
	}

    if (child == 0) {
        execvp(tokens[0], tokens);
        printf("No such file\n");
        _exit(0);
    } else {
        wait(0);
	}
	return 1;
}
