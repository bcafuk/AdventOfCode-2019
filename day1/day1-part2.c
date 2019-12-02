#include <stdio.h>

int main() {
	int sum = 0;
	int n;
	
	while (1) {
		scanf("%d", &n);
		if (feof(stdin)) {
			break;
		}
		while (1) {
			n = n / 3 - 2;
			if (n <= 0) {
				break;
			}
			sum += n;
		}
	}
	printf("%d\n", sum);
	
	return 0;
}
