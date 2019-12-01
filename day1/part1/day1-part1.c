#include <stdio.h>

int main() {
	int sum = 0;
	int n;
	
	while (1) {
		scanf("%d", &n);
		if (feof(stdin)) {
			break;
		}
		sum += n / 3 - 2;
	}
	printf("%d\n", sum);
	
	return 0;
}
