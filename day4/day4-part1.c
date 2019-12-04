#include <stdbool.h>
#include <stdio.h>

bool fitsPattern(int n) {
	bool hasDoubles = false;
	
	int prevDigit = n % 10;
	n /= 10;
	
	while (n != 0) {
		int digit = n % 10;
		n /= 10;
		
		if (digit == prevDigit) {
			hasDoubles = true;
		} else if (digit > prevDigit) {
			return false;
		}
		
		prevDigit = digit;
	}
	
	return hasDoubles;
}

int main() {
	int lo;
	int hi;
	size_t count = 0;
	
	scanf("%d %d", &lo, &hi);
	
	for (int n = lo; n <= hi; ++n) {
		if (fitsPattern(n)) {
			++count;
		}
	}
	
	printf("%d\n", count);
	
	return 0;
}
